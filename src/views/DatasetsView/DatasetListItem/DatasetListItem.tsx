import DatasetListItemData from "../../../types/DatasetListItemData.ts";
import {
    Avatar,
    Badge,
    Button,
    Card, CardBody,
    CardFooter,
    CardHeader,
    Chip,
    CircularProgress, Divider,
    Image,
    Link,
    Progress, Skeleton
} from "@nextui-org/react";
import {CheckCircleIcon, PhotoIcon} from "@heroicons/react/16/solid";
import numeral from 'numeral'
import {DatasetTaskLocalizations} from "../../../types/DatasetTask.ts";
import dateFormat from 'dateformat'
import TimestampFormat from "../../../utils/TimestampFormat.ts";
import {NavLink} from "react-router-dom";
import {useState} from "react";

const DatasetListItem = ({dataset}: {dataset: DatasetListItemData}) => {

    const [isImageLoaded, setIsImageLoaded] = useState(false)
    const [isAvatarLoaded, setIsAvatarLoaded] = useState(false)


    return <div className="flex gap-x-8 gap-y-3 flex-wrap">
            {/*<Image*/}
            {/*    shadow="sm"*/}
            {/*    radius="lg"*/}
            {/*    width="100%"*/}
            {/*    alt={dataset.name}*/}
            {/*    className="w-full h-40"*/}
            {/*    src={dataset.coverImageUrl}*/}
            {/*/>*/}

            <Card>
                {/*<CardHeader className="absolute z-10 top-1 flex-col !items-start">*/}
                    {/*<p className="text-tiny text-white/60 uppercase font-bold">What to watch</p>*/}
                    {/*<h4 className="text-white font-medium text-large">Stream the Acme event</h4>*/}


                <Skeleton className={"grow h-full flex"} isLoaded={isImageLoaded}>
                    <Image
                        onLoad={() => setIsImageLoaded(true)}
                        removeWrapper
                        alt={dataset.name}
                        className="w-60 grow object-cover h-full"
                        src={dataset.coverImageUrl}
                    />
                </Skeleton>
                {/*</CardHeader>*/}
                {/*<CardFooter className="absolute bottom-0 z-10 justify-end">*/}

                {/*        <Chip variant="solid" size="sm" color="default" radius="sm" startContent={<PhotoIcon className="w-4 h-4 mx-1"/>}>*/}

                {/*            <p className="text-xs font-bold">{numeral(40090).format('0a').toUpperCase()} images</p>*/}
                {/*            /!*<p className="text-black text-tiny">Get notified.</p>*!/*/}
                {/*        </Chip>*/}

                {/*</CardFooter>*/}
            </Card>


            <div className="flex flex-col gap-3">
                <div className="space-y-3">
                    <div className="space-y-1">

                        <div className="flex gap-3">

                            <NavLink
                                // href={`/dataset/${dataset.id}`}
                                to={`/dataset/${dataset.id}`}
                            >
                                <p className="font-semibold text-default-foreground">{dataset.name}</p>
                            </NavLink>

                            <Chip variant="flat" size="sm" color={dataset.open ? "primary" : "default"} radius="sm">
                                {dataset.open ? "Open" : 'Closed'}
                            </Chip>


                            <Chip variant="flat" size="sm" color="secondary" radius="sm">
                                {DatasetTaskLocalizations.getTaskName(dataset.task)}
                            </Chip>

                        </div>

                        <p className="text-default-500 text-xs">Updated {TimestampFormat.shortest(dataset.updatedAt)}</p>
                    </div>

                    <NavLink
                        // href={`/user/${dataset.owner.id}`}
                        className="block"
                        to={`/user/${dataset.owner.id}`}
                    >

                        <div className="inline-flex gap-3 items-center">

                            <Badge content={<CheckCircleIcon className="w-4 h-4"/>} isOneChar={true} size={"sm"}
                                   color={"success"} variant="faded" showOutline={false}>

                                <Skeleton isLoaded={isAvatarLoaded} className="rounded-full">

                                    <Avatar
                                        onLoad={() => setIsAvatarLoaded(true)}
                                        // isBordered
                                        as="button"
                                        className="block transition-transform shrink-0"
                                        color="primary"
                                        name={dataset.owner.username}
                                        size="sm"
                                        src={dataset.owner.avatarUrl}
                                    />
                                </Skeleton>
                            </Badge>

                            <p className="text-sm font-medium text-default-500">{dataset.owner.username}</p>
                        </div>
                    </NavLink>
                </div>



                <p className="text-sm text-default-foreground line-clamp-2 max-w-prose">{dataset.description}</p>
                {/*<Card className="w-min">*/}
                {/*    <CardBody>*/}
                        <div className="inline-flex space-x-6 text-default-foreground">

                            <Card shadow="sm">
                                <CardHeader className="pb-0">

                                    <span className="text-sm font-semibold">Goal</span>
                                </CardHeader>

                                <CardBody>

                                    <p className="text-xl font-semibold">{numeral(40090).format('0a').toUpperCase()}</p>
                                </CardBody>
                            </Card>

                            <Card shadow="sm">
                                <CardHeader className="pb-0">

                                    <span className="text-sm font-semibold">Collected</span>
                                </CardHeader>

                                <CardBody>
                                    <CircularProgress
                                        aria-label={"Collected progress"}
                                        // label="Collected"
                                        classNames={{
                                            label: "text-xs font-medium",
                                            value: "font-bold"
                                        }}
                                        size="sm"
                                        value={(dataset.size / dataset.completionGoal) * 100}
                                        color="primary"
                                        // className="drop-shadow"
                                        showValueLabel

                                        // showValueLabel
                                    />
                                </CardBody>
                            </Card>

                            <Card shadow="sm">
                                <CardHeader className="pb-0">

                                    <span className="text-sm font-semibold">Labeled</span>
                                </CardHeader>

                                <CardBody>

                                <CircularProgress
                                    aria-label={"Labeled progress"}
                                    classNames={{
                                        label: "text-xs font-medium",
                                        value: "font-bold"
                                    }}
                                    // label="Labeled"
                                    size="sm"
                                    value={(dataset.completionAmount / dataset.completionGoal) * 100}
                                    color="success"
                                    className="drop-shadow"
                                    showValueLabel
                                />
                                </CardBody>
                            </Card>
                        </div>
                {/*    </CardBody>*/}
                {/*</Card>*/}
            </div>

        </div>
}

export default DatasetListItem