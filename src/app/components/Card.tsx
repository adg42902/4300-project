import Image from "next/image";
import React from "react";

interface CardProps {
    number: number;
    imageUrl: string;
    title: string;
    artist?: string;
}

export default function Card(props: CardProps) {
    return (
        <div className="flex flex-col items-center justify-center w-40 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
            {props.number} <Image
                className="rounded-lg mx-auto"
                src={props.imageUrl}
                alt="Album cover"
                width={150}
                height={150}
                style={{ objectFit: "cover" }}
            />
            <h2 className="mt-2 text-lg font-semibold text-center">{props.title}</h2>
            <h3 className="text-sm text-gray-600 text-center">{props.artist}</h3>
        </div>
    );
}