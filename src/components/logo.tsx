import { Rethink_Sans } from "next/font/google";

const rethink = Rethink_Sans({
    subsets: ["latin"],
    weight: ["400", "600", "700"],
});

export const Logo = () => {
    return (
        <div className="flex justify-center flex-col items-center gap-0 rethink">
            <div className={rethink.className}>
                <p className="text-7xl text-green-700 italic">My</p>
                <p className="text-7xl text-black italic">Finance</p>
            </div>

        </div>
    )
}

export default Logo;