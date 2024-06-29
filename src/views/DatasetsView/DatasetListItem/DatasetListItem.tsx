import DatasetListItemData from "../../../types/DatasetListItemData.ts";
import {
    Card, CardBody,
    CardHeader,
    Chip,
    CircularProgress,
    Image, Skeleton
} from "@nextui-org/react";
import numeral from 'numeral'
import {DatasetTaskLocalizations} from "../../../types/DatasetTask.ts";
import TimestampFormat from "../../../utils/TimestampFormat.ts";
import {NavLink} from "react-router-dom";
import {useState} from "react";
import SiteUserSummary from "../../../components/SiteUserSummary/SiteUserSummary.tsx";

const DatasetListItem = ({dataset, isLoaded = true}: {dataset: DatasetListItemData, isLoaded?: boolean}) => {

    const [isImageLoaded, setIsImageLoaded] = useState(false)


    return <div className="flex gap-x-8 gap-y-3 flex-wrap">

            <Card>
                <Skeleton className={"grow h-full flex"} isLoaded={isImageLoaded && isLoaded}>
                    <Image
                        onLoad={() => setIsImageLoaded(true)}
                        removeWrapper
                        alt={dataset.name}
                        className="w-60 grow object-cover h-full"
                        src={dataset.coverImageUrl}
                    />
                </Skeleton>
            </Card>

            <div className="flex flex-col gap-3">
                <div className="space-y-3">
                    <div className="space-y-2">

                        <div className="flex gap-3 flex-wrap gap-y-1">

                                <Skeleton isLoaded={isLoaded} className="rounded-lg">
                                    <div className="inline-flex gap-x-2 items-center">
                                        <SiteUserSummary user={dataset.owner} isLoaded={isLoaded} showAvatar={false}/>

                                        <span>/</span>

                                        <NavLink
                                            // href={`/dataset/${dataset.id}`}
                                            to={`/dataset/${dataset.id}`}
                                        >
                                        <p className="font-semibold text-default-foreground">{dataset.name}</p>
                                        </NavLink>
                                    </div>
                                </Skeleton>

                            {
                                isLoaded &&
                                <div className="flex gap-2 flex-wrap gap-y-1">
                                    <Chip variant="flat" size="sm" color={dataset.open ? "primary" : "default"}
                                          radius="sm">
                                        {dataset.open ? "Open" : 'Closed'}
                                    </Chip>


                                    <Chip variant="flat" size="sm" color="secondary" radius="sm">
                                        {DatasetTaskLocalizations.getTaskName(dataset.task)}
                                    </Chip>
                                </div>
                            }
                        </div>


                        <Skeleton isLoaded={isLoaded} className="rounded-md w-fit">
                            <p className="text-default-500 text-xs">Updated {TimestampFormat.shortest(dataset.updatedAt)}</p>
                        </Skeleton>
                    </div>

                </div>

                <Skeleton isLoaded={isLoaded} className="rounded-lg">
                    <p className="text-sm text-default-foreground line-clamp-2 max-w-prose">{dataset.description}</p>
                </Skeleton>

                <div className="inline-flex space-x-6 text-default-foreground">

                    <Skeleton isLoaded={isLoaded} className="rounded-lg">
                        <Card shadow="sm">
                            <CardHeader className="pb-0">

                                <span className="text-sm font-semibold">Goal</span>
                            </CardHeader>

                            <CardBody>

                                <p className="text-xl font-semibold">{numeral(40090).format('0a').toUpperCase()}</p>
                            </CardBody>
                        </Card>
                    </Skeleton>

                    <Skeleton isLoaded={isLoaded} className="rounded-lg">
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
                    </Skeleton>

                    <Skeleton isLoaded={isLoaded} className="rounded-lg">
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
                    </Skeleton>
                </div>
            </div>

        </div>
}

export default DatasetListItem