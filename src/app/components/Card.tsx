import Image from "next/image";
import React from "react";

interface CardProps {
    number: number;
    imageUrl: string;
    title: string;
    artist: string;
}

export default function Card (props: CardProps) {

    return (
        <div className="flex items-center justify-evenly w-full py-2">
            <h2>{props.number}</h2>
            <Image className="rounded-md shadow-lg" src={props.imageUrl} alt="music image" width={100} height={100}></Image>
            <h2>{props.title}</h2>
            <h2>{props.artist}</h2>
        </div>
    )
}