import Image from "next/image";
import { Grid, Box, Container, Divider } from "@mui/material";
import Dashboard from "./component/dashboard";
import Sidebar from "./component/sidebar";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-row items-center bg-gradient-to-r from-blue-300 via-gray-300 to-sky-300 text-black ">
      <Container className='w-1/6 h-screen px-0'>
        <Sidebar />
      </Container>
      <Divider orientation="vertical" flexItem />
      <Container className='w-5/6 mx-0' >
        <Dashboard />
      </Container>
    </main>
  );
}
