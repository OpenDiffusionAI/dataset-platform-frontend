import {Avatar, Badge, Skeleton} from "@nextui-org/react";
import {CheckCircleIcon} from "@heroicons/react/16/solid";
import {NavLink} from "react-router-dom";
import SiteUserData from "../../types/SiteUserData.ts";
import {useState} from "react";

const SiteUserSummary = ({user, showAvatar=true, isLoaded=true}: {user: SiteUserData, showAvatar?: boolean, isLoaded?: boolean}) => {

    const [isAvatarLoaded, setIsAvatarLoaded] = useState(false)

    return <NavLink
        // href={`/user/${dataset.owner.id}`}
        className="block"
        to={`/user/${user.id}`}
    >

        <div className="inline-flex gap-3 items-center">

            {
                showAvatar &&

                <Badge isInvisible={!isLoaded || !user.verified} content={ user.verified ? <CheckCircleIcon className="w-4 h-4"/> : <></>} isOneChar={true} size={"sm"}

                       color={"success"} variant="faded" showOutline={false}>

                    <Skeleton isLoaded={isAvatarLoaded && isLoaded} className="rounded-full">

                        <Avatar
                            onLoad={() => setIsAvatarLoaded(true)}
                            // isBordered
                            as="button"
                            className="inline-block transition-transform shrink-0"
                            color="primary"
                            name={user.username}
                            size="sm"
                            src={user.avatarUrl}
                        />
                    </Skeleton>
                </Badge>

            }

            <div className="inline-flex gap-x-2 items-center">

                <Skeleton isLoaded={isLoaded} className="rounded-lg">
                    <p className="text-sm font-medium text-default-500">{user.username}</p>
                </Skeleton>

                {
                    !showAvatar &&
                    user.verified &&
                    <CheckCircleIcon className="w-3.5 h-3.5 text-primary-500 fill-success"/>
                }
            </div>
        </div>
    </NavLink>
}

export default SiteUserSummary