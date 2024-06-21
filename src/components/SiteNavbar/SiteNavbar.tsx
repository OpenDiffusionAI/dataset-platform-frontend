import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Input,
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    Avatar,
    NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button
} from "@nextui-org/react";
import {MagnifyingGlassIcon} from "@heroicons/react/20/solid";
import {useState} from "react";
import {MagnifyingGlassIcon as MagnifyingGlassIconLarge} from "@heroicons/react/24/outline";
import {XMarkIcon} from "@heroicons/react/24/solid";
import NavbarAccountData from "../../types/NavbarAccountData.ts";
import PageLink from "../../types/PageLink.ts";
import {NavLink} from "react-router-dom";

const pages: PageLink[] = [
    { href: "/", title: "Home" },
    { href: "/datasets", title: "Datasets" },
    { href: "/get-started", title: "Get started" },
]

export default function SiteNavbar({
    currentPage
}: {
    currentPage: string
}) {

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // const [currentPage, setCurrentPage] = useState(pages[0].title)
    const [loggedIn, setLoggedIn] = useState(false)
    const [accountData, setAccountData] = useState<undefined | NavbarAccountData>({
        email: "example@gmail.com",
        username: "Jason",
        avatarUrl: "https://picsum.photos/80/80"

    })

    return (
        <Navbar isBordered onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent justify="start">
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand className="mr-4">

                    <p className="block sm:hidden font-bold text-inherit">Datasets</p>
                    <p className="hidden sm:block font-bold text-inherit">OpenDiffusion Datasets</p>
                </NavbarBrand>
                <NavbarContent className="hidden sm:flex gap-3" >
                    {
                        pages.map((page, i) => (
                            <NavbarItem key={i}>
                                <NavLink
                                    // color={currentPage === page.title ? "primary" : "foreground"}
                                    className={currentPage === page.href ? "text-primary" : "text-foreground"}
                                    // aria-current={currentPage === page.title ? "page" : undefined}
                                    // href={page.href}
                                    to={page.href}
                                >
                                    {page.title}
                                </NavLink>
                            </NavbarItem>
                        ))
                    }
                </NavbarContent>
            </NavbarContent>

            <NavbarContent as="div" className="items-center" justify="end">


                <Button className={`block sm:hidden`} color={isSearchOpen ? "primary" : "default"} size="sm" variant="light" radius="full" isIconOnly={true} onClick={() => {
                    setIsSearchOpen(prevState => !prevState)
                }}>
                    {
                        isSearchOpen ? <XMarkIcon className="w-8 h-8" /> : <MagnifyingGlassIconLarge className="w-8 h-8" />
                    }
                </Button>
                <NavbarContent justify="end" className={`${!isSearchOpen ? 'hidden' : 'flex'} sm:flex `}>
                <div className={`${!isSearchOpen ? 'hidden' : 'block'} sm:block `}>

                    <Input
                        classNames={{
                            base: "max-w-full sm:max-w-[12rem] h-10",
                            mainWrapper: "h-full",
                            input: "text-small",
                            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                        }}
                        isClearable
                        placeholder="Search datasets..."
                        size="sm"
                        startContent={<MagnifyingGlassIcon className="w-5 h-5 shrink-0" />}
                        // type="search"
                    />
                </div>
                </NavbarContent>


                {
                    loggedIn ?

                        <Dropdown placement="bottom-end" >
                            <DropdownTrigger>
                                <Avatar
                                    isBordered
                                    as="button"
                                    className={`${isSearchOpen ? 'hidden' : 'block'} transition-transform shrink-0`}
                                    color="primary"
                                    name={accountData?.username ?? "No name"}
                                    size="sm"
                                    src={accountData?.avatarUrl ?? undefined}
                                />
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Profile Actions" variant="flat">
                                <DropdownItem key="profile" className="h-14 gap-2">
                                    <p className="font-semibold">Signed in as</p>
                                    <p className="font-semibold">{accountData?.email ?? "No email"}</p>
                                </DropdownItem>
                                <DropdownItem key="settings">My Contributions</DropdownItem>
                                <DropdownItem key="settings">My Datasets</DropdownItem>
                                <DropdownItem key="settings">My Settings</DropdownItem>
                                {/*<DropdownItem key="team_settings">Team Settings</DropdownItem>*/}
                                {/*<DropdownItem key="analytics">Analytics</DropdownItem>*/}
                                {/*<DropdownItem key="system">System</DropdownItem>*/}
                                {/*<DropdownItem key="configurations">Configurations</DropdownItem>*/}
                                <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                                <DropdownItem key="logout" color="danger">
                                    Log Out
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>

                        :


                        <div className={`${isSearchOpen ? 'hidden' : 'flex'} gap-4`}>
                            <NavbarItem className="hidden lg:flex">
                                <NavLink
                                    className="self-center"
                                    // href="#"
                                    to={'/login'}
                                >Login</NavLink>
                            </NavbarItem>
                            <NavbarItem>
                                <Button as={Link} color="primary" href="#" variant="flat">
                                    Sign Up
                                </Button>
                            </NavbarItem>
                        </div>
                }

            </NavbarContent>
            <NavbarMenu>
                {pages.map((item, index) => (
                    <NavbarMenuItem key={`${item.title}-${index}`}>
                        <NavLink
                            // color={currentPage === item.href ? "primary" : "foreground"}
                            // aria-current={currentPage === item.title ? "page" : undefined}

                            className={(currentPage === item.href ? "text-primary" : "text-foreground") + " w-full"}
                            // href={item.href}
                            to={item.href}
                            // size="lg"
                        >
                            {item.title}
                        </NavLink>
                    </NavbarMenuItem>
                ))}
                {
                    !loggedIn &&
                    <NavbarItem>
                        <NavLink
                            // color={currentPage === '/login' ? "primary" : "foreground"}
                            className={(currentPage === '/login' ? "text-primary" : "text-foreground") + " w-full"}
                            // aria-current={currentPage === 'Login' ? "page" : undefined}
                            // href="#"
                            to={'/login'}
                            // size="lg"
                        >Login</NavLink>
                    </NavbarItem>
                }
            </NavbarMenu>
        </Navbar>
    );
}
