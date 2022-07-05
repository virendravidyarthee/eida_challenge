import { NextPage } from "next";
import Image from 'next/image'
import Logo from '../../assets/Eida-logo-green-ny.png'
import styles from '../../styles/Home.module.css'
import Link from "next/link";
import dynamic from "next/dynamic";
import { ResponsiveContainer } from "recharts";
import { Card, Text } from "@mantine/core";
import Head from "next/head";
const LineChart = dynamic(import("../../components/charts/line_chart"), { ssr: false });


const errorPage: React.FC<{ message: string }> = ({ message }) => {
    return (
        <>
            <Head>
                <title>Error: {message}</title>
            </Head>
            <Text>{message}</Text>
        </>
    )
}

export default errorPage;