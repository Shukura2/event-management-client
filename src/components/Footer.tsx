import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaPinterest } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const data = [
  { id: 1, link: "home", href: "" },
  { id: 2, link: "About us", href: "" },
  { id: 3, link: "events", href: "" },
  { id: 4, link: "news", href: "" },
  { id: 5, link: "contact", href: "" },
];

const Footer = () => {
  return (
    <div className="bg-[#08011e] py-[75px]">
      <div className="mx-auto max-w-[1200px] p-5 md:py-7 md:px-9">
        <div className="flex justify-center">
          <Image
            src="https://preview.colorlib.com/theme/agenda/images/logo.png"
            alt="logo"
            width={188}
            height={147}
          />
        </div>

        <div className="text-white uppercase font-bold flex flex-wrap justify-center leading-10 gap-x-5 mt-8">
          {data.map((list) => (
            <Link href="" key={list.id}>
              {list.link}
            </Link>
          ))}
        </div>

        <p className="text-[#2f2f2f] text-center text-sm mb-16 mt-5">
          Copyright © 2025 All rights reserved | This template is made with
          &hearts; by <span className=" text-[#800080]">Colorlib</span>
        </p>

        <div className="text-white flex flex-wrap justify-center">
          <div className="flex gap-x-7">
            <FaPinterest />
            <FaLinkedin />
            <FaInstagram />
            <FaFacebookF />
            <FaTwitter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
