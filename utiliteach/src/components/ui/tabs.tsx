import Link from "next/link";
import React from "react";

const Tabs = ({ links }: { links: { link: string, icon: React.JSX.Element, label: string }[] }) => {
  return (
    <div className="w-full flex fixed bottom-0 border border-t-black h-24 max-sm:text-xs md:hidden">
      {
        links.map((link, index) => (
          <Link key={index} href={link.link} className="h-full flex max-md:flex-col gap-3 flex-grow justify-center items-center border">
            { React.cloneElement(link.icon, { className: 'scale-125' }) }
            { link.label }
          </Link>
        ))
      }
    </div>
  );
}

export default Tabs;
