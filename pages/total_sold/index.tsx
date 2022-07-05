import { NextPage } from "next";
import { Record } from "..";
import Image from 'next/image'
import Logo from '../../assets/Eida-logo-green-ny.png'
import styles from '../../styles/Home.module.css'
import Link from "next/link";
import dynamic from "next/dynamic";
import { ResponsiveContainer } from "recharts";
import { Card, Text } from "@mantine/core";
import Head from "next/head";
import ErrorPage from "../../components/error_page/error_page";
const LineChart = dynamic(import("../../components/charts/line_chart"), { ssr: false });


const totalSoldPage: NextPage = (props: {
    recordList?: [Record],
    error?: Error
}) => {
    if (!props.error) {
        if (props.recordList?.length ?? 0 > 0) {
            const latestRecord = props.recordList![props.recordList?.length! - 1];
            return (
                <div>
                    <Head>
                        <title>Total energy sold</title>
                    </Head>
                    <div className={styles.logoDiv}>
                        <Link href={'/'} passHref>
                            <a>
                                <Image src={Logo} height={100} width={225} />
                            </a>
                        </Link>
                    </div>
                    <br />
                    <Card shadow={"md"} radius={"md"}>
                        <Text weight={700}>Total energy sold</Text>
                        <Text weight={500}>{latestRecord.total_sold_PV} kwh</Text>
                        <br />
                        <LineChart data={props.recordList!} xAxisKey="inverter_update_time" yAxisKey="total_sold_PV"></LineChart>
                    </Card>
                </div>
            )
        } else {
            return (
                <ErrorPage message="No data" />
            )
        }
    } else {
        return (
            <ErrorPage message="No data" />
        )
    }
}

export const getServerSideProps = async () => {
    try {
        const res = await fetch(`https://api.staging.eidaenergy.no/consumer/v1/historic/a117ce35-0538-4a38-b1be-db263117a548?limit=100&fromDate=2022-05-27&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb25zdW1lciI6eyJpZCI6MywibmFtZSI6IkFuZGVyc0YiLCJjb250YWN0ZW1haWwiOiJhbmRlcnNAaG9tZXNvdXJjaW5nLm5vIiwidG9rZW4iOm51bGx9LCJpYXQiOjE2NTY2NjQ4MDB9.dlHyktJSXFYxCkmEDQB3K2YIZcAjIKemSDT08H2JDlI`);
        const data = await res.json();

        return {
            props: {
                recordList: data,
            }
        }
    } catch (error) {
        if (error instanceof Error)
            return {
                props: {
                    error
                }
            }
    }
}

export default totalSoldPage