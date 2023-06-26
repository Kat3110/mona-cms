import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { EventListTable } from "/src/components/event/event-list-table";
import { EventListHeader } from "/src/components/event/event-list-header";
import { DashboardLayout } from "/src/components/dashboard-layout";
import { customers } from "/src/__mocks__/customers";
import { useState, useEffect } from "react";
import EventService from "../../services/EventService/EventService";

const Page = () => {
    const [listEvent, setListEvent] = useState([]);
    const [timeReRender, setTimeReRender] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await EventService.getEventList({
                    startDate: "",
                    endDate: "",
                    name: "",
                    category: ""
                });
                setListEvent(res?.data?.result ?? []);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [timeReRender]);

    const handleSearch = async (condition) => {
        try {
            const res = await EventService.getEventList(condition);
            setListEvent(res?.data?.result ?? []);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth={false}>
                    <EventListHeader onSearch={handleSearch} />
                    <Box sx={{ mt: 3 }}>
                        <EventListTable
                            listEvent={listEvent}
                            setTimeReRender={setTimeReRender}
                        />
                    </Box>
                </Container>
                <Box sx={{ mt: 3 }}></Box>
            </Box>
        </>
    );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
