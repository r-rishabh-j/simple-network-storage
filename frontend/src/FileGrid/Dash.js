import React from 'react'
import { useEffect, useState } from 'react'
import { DataGrid, GridRowEditStartReasons, GridToolbar } from "@mui/x-data-grid"
import { Button, Grid, Paper } from '@mui/material';
import axios from 'axios';
import { Box } from '@mui/system';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteIcon from '@mui/icons-material/Delete';

const moment = require('moment');

const Dash = () => {
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        fetch("/api/getfiles")
            .then((data) => data.json())
            .then((data) => {
                setTableData(data.files);
            })
    }, [])

    const handleDowload = (event, cellValues) => {
        const file_id = cellValues.row.id;
        return axios({
            method: "GET",
            url: "/api/files",
            params: {
                id: file_id
            },
            headers: { "Content-type": "application/json" },
        })
            .then((response) => {
                console.log(response.data);
                window.open(response.data.path);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log(error.response.status);
                    alert("FILE NOT FOUND");
                }
            });
    }

    const handleDelete = (event, cellValues) => {
        const file_id = cellValues.row.id;

        return axios({
            method: "POST",
            url: "/api/delete-files",
            data: {"id": file_id},
            headers: { "Content-type": "application/json" },
        })
            .then((response) => {
                window.location.reload();
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log(error.response.status);
                    alert("FILE NOT FOUND");
                }
            });
    }

    const handleCellClick = (param, event) => {
        event.stopPropagation();
    };

    const handleRowClick = (param, event) => {
        event.stopPropagation();
    };

    const cellElement = (cellValues) => {
        return (
            <div
                title={cellValues.formattedValue}
                style={{
                    overflow: "scroll",
                }}
            >
                {cellValues.formattedValue}
            </div>
        );
    };

    function formatDate(date) {
        const d = String(moment(date).local().format("HH:mm a, DD/MM/YYYY"));
        return d;
    }

    const timeElement = (cellValues) => {
        const time = formatDate(cellValues.formattedValue);
        return (
            <div title={time} style={{ overflow: "scroll"}} align="right">
                {time}
            </div>
        );
    }

    const columns = [
        {
            field: "filename",
            headerName: "File Name",
            minWidth: 200,
            flex: 1,
            renderCell: cellElement
        },
        {
            field: "download",
            headerName: "Download",
            minWidth: 100,
            disableExport: true,
            sortable: false,
            filterable: false,
            flex: 1,

            renderCell: (cellValues) => {
                return (
                    <>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={(event) => {
                                handleDowload(event, cellValues);
                            }}
                        >
                            <ArrowDownwardIcon/>
                        </Button>
                    </>
                );
            },
        },
        {
            field: "delete",
            headerName: "Delete",
            minWidth: 100,
            disableExport: true,
            sortable: false,
            filterable: false,
            flex: 1,

            renderCell: (cellValues) => {
                return (
                    <>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={(event) => {
                                handleDelete(event, cellValues);
                            }}
                        >
                            <DeleteIcon/>
                        </Button>
                    </>
                );
            },
        },
        {
            field: "time",
            headerName: "Time",
            minWidth: 100,
            flex: 1,
            renderCell: timeElement,
            valueGetter: (cellValues)=>{
                return cellValues.value+"+530"
            }
        },
    ];

    return (
        <>
            <Paper
                elevation={10}
                style={{ display: "flex", minHeight: "calc(100vh - 99px)" }}
            >
                <Grid container style={{ flexGrow: 1 }}>
                    <DataGrid
                        initialState={{
                            sorting: { sortModel: [{ field: "time", sort: "desc" }] },
                        }}
                        columns={columns}
                        rows={tableData}
                        getRowId={(row) => row.id}
                        onCellClick={handleCellClick}
                        onRowClick={handleRowClick}
                    />
                </Grid>
            </Paper>
            <Box minHeight={'2vh'} />
        </>
    )
}

export default Dash