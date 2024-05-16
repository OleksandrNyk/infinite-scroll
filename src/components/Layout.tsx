import { Outlet } from "react-router-dom";
import Head from "./Head.tsx";

export default function Layout() {
    return (<main
            className="bg-main relative flex flex-grow flex-col bg-[#FFFEFB] bg-[center_top] w-full h-full bg-no-repeat">
            <div className="relative flex flex-grow flex-col px-5">
                <div className="container mx-auto">
                    <Head/>
                </div>
                <div
                    className="container relative mx-auto flex flex-grow flex-col w-full rounded-lg bg-[#FFFEFB] px-3 py-4 lg:p-10"
                    style={{boxShadow: "rgba(0,0,0,.075) 0px 4px 10px 4px"}}
                >
                    <Outlet/>
                </div>
                <div className="text-dark-blue">
                    <div className="container mx-auto flex items-center justify-center gap-5 py-5">
                        <div className="text-center font-interlight">
                            © Test Env {new Date().getFullYear()}
                        </div>
                    </div>
                </div>
            </div>
        </main>);
}
