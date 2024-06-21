import PageLink from "../../types/PageLink.ts";
import {Divider} from "@nextui-org/react";
import {NavLink} from "react-router-dom";


const pages: PageLink[] = [
    { href: "/", title: "Home" },
    { href: "/datasets", title: "Datasets" },
    { href: "/exclusion-request", title: "Exclusion request" },
]

const connect: PageLink[] = [
    { href: "https://github.com/OpenDiffusionAI", title: "Github" },
    { href: "#", title: "Discord" },
    { href: "https://www.reddit.com/r/Open_Diffusion/", title: "Reddit" },
]

const resources: PageLink[] = [
    { href: "/get-started", title: "Get started" },
    { href: "/how-it-works", title: "How it works" },
    { href: "/documentation", title: "Documentation" },
]

const openDiffusion: PageLink[] = [
    { href: "/about", title: "About" },
    { href: "/values", title: "Our values" },
    { href: "/ethical-ai", title: "Ethical AI" },
    { href: "/safety", title: "Safety" },
]

type LinkGroup = {
    name: string
    links: PageLink[]
}

const links: LinkGroup[] = [
    {
        name: 'Pages',
        links: pages
    },
    {
        name: 'Connect',
        links: connect
    },
    {
        name: 'Resources',
        links: resources
    },
    {
        name: 'Open Diffusion AI',
        links: openDiffusion
    }
]

const SiteFooter = () => {


    return <div className="bg-default-200 flex justify-center px-8">
        <div className="max-w-3xl w-full py-8 space-y-8">

            <div className="inline-grid grid-cols-1  sm:grid-cols-2  lg:grid-cols-4 gap-x-16 gap-y-6">

                {
                    links.map((group, groupIndex) => (

                        <div className="space-y-1 text-sm font-semibold text-default-600" key={groupIndex}>
                            <p>{group.name}</p>
                            {
                                group.links.map((page, i) => (
                                    <NavLink
                                        className="block"
                                        // href={page.href}
                                        to={page.href}
                                        key={i}
                                        target={page.href.startsWith("/") || page.href.startsWith("#") ? "_self" : "_blank"}
                                    >
                                        <p className="text-base">{page.title}</p>
                                    </NavLink>
                                ))
                            }
                        </div>
                    ))
                }

            </div>

            <Divider/>

            <p className="text-default-600 text-sm">© {2024} Open Diffusion AI. All rights reserved.</p>
        </div>
    </div>
}

export default SiteFooter