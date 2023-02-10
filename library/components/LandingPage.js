import React from "react";
import Image from "next/image";
import harrypotter from "../public/harrypotter.jpg";
import landscape from "../public/landscape.jpg";
import harry2 from "../public/harry2.jpg";
import img2 from "../public/img2.jpg";

export default function LandingPage() {
  return (
    <div>
      <div className="brow-1">
        <Image className="images" src={harry2} width={240}></Image>
        <Image className="images" src={img2} width={440}></Image>
        <Image className="images" src={harrypotter} width={270}></Image>
      </div>
      <div className="brow-2">
        <Image
          className="images2"
          src={landscape}
          height={400}
          width={900}
        ></Image>
      </div>
    </div>
  );
}
