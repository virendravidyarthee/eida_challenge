import type { NextPage } from 'next'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Logo from '../assets/Eida-logo-green-ny.png'
import Link from 'next/link'
import { Card, Grid, Space, Text } from '@mantine/core'
import Head from 'next/head'
import ErrorPage from '../components/error_page/error_page'

export interface Record {
  id: number;
  inverter_update_time: Date;
  iotc_device_id: string;
  eida_internal_deviceId: string;
  address: string;
  battery_capacity?: any;
  battery_charging_current?: any;
  battery_charging_month?: any;
  battery_discharging_month?: any;
  battery_discharging_today: string;
  battery_discharging_total: string;
  battery_discharging_year?: any;
  battery_power?: any;
  battery_prc: string;
  daily_prod_KWH: string;
  daily_sold_PV: string;
  latitude: string;
  longitude: string;
  monthly_prod_KWH?: any;
  monthly_sold_PV?: any;
  product: string;
  realtime_prod_KWH?: any;
  serialnumber_inverter: string;
  total_prod_KWH: string;
  total_sold_PV: string;
  yearly_prod_KWH?: any;
  yearly_sold_PV?: any;
  yesterday_sold_PV?: any;
  consumption_total: string;
  consumption_daily: string;
  marketprice_daily?: any;
  price_hour?: any;
  price_area?: any;
  price?: any;
  price_including_vat?: any;
  price_unit_of_measurement?: any;
  realtime_prod_W: string;
}


const Home: NextPage = (props: {
  recordList?: [Record],
  error?: Error
}) => {
  if (!props.error) {
    if (props.recordList?.length ?? 0 > 0) {
      const latestRecord = props.recordList![props.recordList?.length! - 1];
      return (
        <div className={styles.offWhiteBackground}>
          <Head>
            <title>Eida energy</title>
          </Head>
          <div className={styles.logoDiv}>
            <Image src={Logo} height={100} width={225} />
          </div>
          <br />
          <Card shadow={"md"} radius={'md'}>
            <Text align='right'>Location 3</Text>
          </Card>
          <br />
          <Grid columns={2}>
            <Grid.Col span={1}>
              <Link href={'/total_consumption_today'} passHref>
                <Card shadow={"md"} radius={'md'}>
                  <Text weight={700}>Total Consumption kwh</Text>
                  <Space h={'md'} />
                  <Text weight={400}>{latestRecord.consumption_daily} kwh</Text>
                </Card>
              </Link>
            </Grid.Col>
            <Grid.Col span={1}>
              <Link href={'/total_production_today'} passHref>
                <Card shadow={"md"} radius={'md'}>
                  <Text weight={700}>Total production today kwh</Text>
                  <Space h={'md'} />
                  <Text weight={400}>{latestRecord.daily_prod_KWH} kwh</Text>
                </Card>
              </Link>
            </Grid.Col>
            <Grid.Col span={1}>
              <Card shadow={"md"} radius={'md'}>
                <Text weight={700}>Total production week kwh</Text>
                <Space h={'md'} />
                <Text weight={400}>NA kwh</Text>
              </Card>
            </Grid.Col>
            <Grid.Col span={1}>
              <Card shadow={"md"} radius={'md'}>
                <Text weight={700}>Total production month kwh</Text>
                <Space h={'md'} />
                <Text weight={400}>{latestRecord.monthly_prod_KWH ?? "NA"} kwh</Text>
              </Card>
            </Grid.Col>
            <Grid.Col span={1}>
              <Card shadow={"md"} radius={'md'}>
                <Text weight={700}>Total production year kwh</Text>
                <Space h={'md'} />
                <Text weight={400}>{latestRecord.yearly_prod_KWH ?? "NA"} kwh</Text>
              </Card>
            </Grid.Col>
            <Grid.Col span={1}>
              <Card shadow={"md"} radius={'md'}>
                <Text weight={700}>Forecasted consumption kwh</Text>
                <Space h={'md'} />
                <Text weight={400}>NA kwh</Text>
              </Card>
            </Grid.Col>
            <Grid.Col span={1}>
              <Card shadow={"md"} radius={'md'}>
                <Text weight={700}>Forecasted production kwh</Text>
                <Space h={'md'} />
                <Text weight={400}>NA kwh</Text>
              </Card>
            </Grid.Col>
            <Grid.Col span={1}>
              <Link href={'/total_sold'} passHref>
                <Card shadow={"md"} radius={'md'}>
                  <Text weight={700}>Total Energy sold PV</Text>
                  <Space h={'md'} />
                  <Text weight={400}>{latestRecord.total_sold_PV} PV</Text>
                </Card>
              </Link>
            </Grid.Col>
            <Grid.Col span={1}>
              <Link href={'/battery_status'} passHref>
                <Card shadow={"md"} radius={'md'}>
                  <Text weight={700}>Battery</Text>
                  <Space h={'md'} />
                  <Text weight={400}>{latestRecord.battery_power ? 'Charging' : 'Discharging'}</Text>
                </Card>
              </Link>
            </Grid.Col>
          </Grid>
        </div>
      )
    } else {
      return (
        <ErrorPage message='No data' />
      )
    }
  } else {
    return (
      <ErrorPage message={props.error.message} />
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

export default Home
