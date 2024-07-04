import {faker} from "@faker-js/faker";
import {ReactNode, useEffect, useState} from "react";
import {
    Button, Card, CardBody, CardHeader,
    Chip, CircularProgress,
    Divider, Link,
    Popover, PopoverContent,
    PopoverTrigger,
    Skeleton,
    Snippet,
    Tab,
    Tabs,
} from "@nextui-org/react";
import SiteUserSummary from "../../components/SiteUserSummary/SiteUserSummary.tsx";
import SiteUserData from "../../types/SiteUserData.ts";
import {DatasetTaskLocalizations} from "../../types/DatasetTask.ts";
import {
    CameraIcon,
    ExclamationTriangleIcon, EyeIcon,
    FolderOpenIcon,
    HashtagIcon,
    InformationCircleIcon,
    TableCellsIcon,
    TagIcon
} from "@heroicons/react/16/solid";
import {NavLink, useLocation} from "react-router-dom";
import numeral from 'numeral'
import TimestampFormat from "../../utils/TimestampFormat.ts";
import {PencilSquareIcon} from "@heroicons/react/20/solid";
import DatasetDetailData from "../../types/DatasetDetailData.ts";
import ImageLabelingGuidelines from "../../types/ImageLabelingGuidelines.ts";
import ImageLabelingDatasetPreview from "./DatasetPreview/ImageLabelingDatasetPreview.tsx";
import ImageLabelingAction from "../../types/ImageLabelingAction.ts";
import ArtifactsView from "./ArtifactsView.tsx";
import UploadImagesView from "./UploadImagesView.tsx";

const ipsumUser: SiteUserData = {
    id: faker.string.uuid(),
    username: faker.internet.userName(),
    avatarUrl: faker.image.avatar(),
    verified: false,
}

const ipsumDataset: DatasetDetailData = {
    id: faker.string.uuid(),
    name: 'OpenDiffusion',
    description: 'A dataset focused on achieving pixel precision for sharper images. A dataset focused on achieving pixel precision for sharper images. A dataset focused on achieving pixel precision for sharper images.',
    coverImageUrl: `https://picsum.photos/seed/${faker.number.int({min: 0, max: 100})}/500/300`,
    tags: ['Realistic', 'NSFW', 'Synthetic'],
    size: 40090,
    completionGoal: 50000,
    completionAmount: 3000,
    open: true,
    task: 'image-labeling',
    createdAt: faker.date.recent().getTime(),
    updatedAt: faker.date.recent().getTime(),
    owner: ipsumUser,
    guidelines: {
        type: 'image-labeling',
        imageGuidelines: "We are collecting copyright free, AI generated and real images in all styles.",
        labelingGuidelines: "Both booru tag and natural language labeling formats are recommended to be submit with every labeling action",
        maturityGuidelines: "Most NSFW content is permitted, except for gore and extreme violence.",
        vlmGuidelines: "AI generated image labeling must be done with CogVLM."
    } as ImageLabelingGuidelines
}

const ipsumLabelingActionFactory = () => {
    return {
        id: faker.string.uuid(),
        imageUrl: faker.image.url(),
        descriptions: {
            tags: {
                'cogvlm': 'cat, animal, table',
            },
            naturalLanguage: {
                'cogvlm': 'A cat sitting on a wooden table',
            }
        },
        metaAttributes: {
            // width: '1920',
            // height: '1080',
            // format: 'jpeg'
            style: 'realistic',
            artist: 'AI',
        },
        wasHumanReviewed: faker.datatype.boolean(),
        wasHumanEdited: faker.datatype.boolean(),
        maturityRating: {
            nsfw: faker.datatype.boolean({probability: 0.2}) ? 'not-rated' :
                faker.datatype.boolean({probability: 0.2}) ? 'safe' :
                    faker.datatype.boolean({probability: 0.2}) ? 'explicit' : 'suggestive',
            violence: faker.datatype.boolean({probability: 0.2}) ? 'not-rated' :
                faker.datatype.boolean({probability: 0.2}) ? 'none' :
                    faker.datatype.boolean({probability: 0.2}) ? 'extreme' : 'mild',
            gore: faker.datatype.boolean({probability: 0.2}) ? 'not-rated' :
                faker.datatype.boolean({probability: 0.2}) ? 'none' :
                    faker.datatype.boolean({probability: 0.2}) ? 'extreme' : 'mild',
        },
        hasHumanGeneratedMaturityRating: faker.datatype.boolean(),
        quality: faker.number.int({min: 0, max: 5}),
        vlms: ['cogvlm-4b', 'gpt-4v', 'florence2', 'internvl-chat-26B'],
        elapsedSeconds: faker.number.int({min: 5, max: 30})
    } as ImageLabelingAction

}

const ipsumLabelingActions = Array.from({length: 50}).map(() => ipsumLabelingActionFactory())

type DescriptionSection = {
    title: string;
    icon?: ReactNode;
    content: string;
}

const DatasetDetailView = ({datasetId}: {datasetId: string}) => {

    const [dataset, setDataset] = useState<DatasetDetailData | undefined>(undefined)

    const fetchDataset = async () => {
        await new Promise(resolve => setTimeout(resolve, faker.number.int({min: 200, max: 500})))

        setDataset(ipsumDataset)
    }

    useEffect(() => {
        fetchDataset()
            .then(() => {})
    }, []);

    const isLoaded = dataset !== undefined

    const imageGuidelines = dataset ? dataset.guidelines as ImageLabelingGuidelines : undefined

    const descriptionSections: DescriptionSection[] = [
        {
            title: 'Description',
            content: dataset?.description ?? "Lorem ipsum"
        },
        {
            title: 'Image guidelines',
            icon: <CameraIcon className="w-4 h-4 text-primary"/>,
            content: imageGuidelines?.imageGuidelines ?? "Lorem ipsum"
        },
        {
            title: 'Labeling guidelines',
            icon: <TagIcon className="w-4 h-4 text-danger"/>,
            content: imageGuidelines?.labelingGuidelines ?? "Lorem ipsum"
        },
        {
            title: 'Content maturity guidelines',
            icon: <ExclamationTriangleIcon className="w-4 h-4 text-warning"/>,
            content: imageGuidelines?.maturityGuidelines ?? "Lorem ipsum"
        },
        {
            title: 'Vision Language Model (VLM) guidelines',
            icon: <EyeIcon className="w-4 h-4 text-secondary"/>,
            content: imageGuidelines?.vlmGuidelines ?? "Lorem ipsum"
        }
    ]

    const {hash} = useLocation();
    const hashKey = hash !== '' ? hash.substring(1) : 'about'

    // px-8
    // py-8
    return <div className=" flex items-center  flex-col grow">

        <div className=" w-full flex flex-col h-fit grow">

            {/*max-w-screen-lg*/}
            <div className="flex gap-x-8 gap-y-4 bg-default-50/75 px-8 pt-8 justify-center">

                <div className="space-y-4 max-w-screen-lg grow w-full">

                    <Skeleton isLoaded={isLoaded} className="rounded-lg">


                        <Snippet symbol={null} className="items-center" classNames={{
                            pre: 'font-sans',
                            base: 'bg-transparent p-0'
                        }}>

                            <div className="inline-flex gap-x-2 items-center">

                                <SiteUserSummary user={dataset?.owner ?? ipsumUser} isLoaded={isLoaded}/>

                                <span>/</span>

                                <NavLink to={'#'}>
                                    <h1 className="md:text-2xl font-semibold">{dataset?.name ?? "Dataset name"}</h1>
                                </NavLink>
                            </div>
                        </Snippet>

                    </Skeleton>


                    {
                        hashKey !== 'dataset-preview' &&

                        <div className="inline-flex gap-6">

                            <div className="flex gap-2 flex-col">

                                <span className="text-default-500 text-xs">Status</span>

                                <Chip variant={dataset?.open ? "shadow" : 'flat'} size="sm"
                                      color={dataset?.open ? "primary" : "default"} radius="sm">
                                    {dataset?.open ? "Open" : 'Closed'}
                                </Chip>
                            </div>

                            <div className="flex gap-2 flex-col">

                                <span className="text-default-500 text-xs">Task</span>

                                <div className="flex gap-3 flex-wrap items-center">
                                    {
                                        isLoaded &&
                                        <>
                                            <Chip variant="shadow" size="sm" color="secondary" radius="sm">
                                                {DatasetTaskLocalizations.getTaskName(dataset.task)}
                                            </Chip>
                                        </>
                                    }
                                </div>
                            </div>

                            <div className="flex gap-2 flex-col">

                                <span className="text-default-500 text-xs">License</span>

                                <div className="flex gap-3 flex-wrap items-center">
                                    {
                                        isLoaded &&
                                        <>
                                            <Popover placement="bottom" showArrow={true}>
                                                <PopoverTrigger>
                                                    <Button variant="shadow" size="sm" color="default" radius="sm"
                                                            className="px-2 h-6">
                                                        <span>cc-by-4.0</span>
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent>
                                                    <div className="px-1 py-2">
                                                        <div className="text-small font-bold">Learn more</div>
                                                        <Link target="_blank"
                                                              href="https://choosealicense.com/licenses/cc-by-4.0/">
                                                            <div className="text-tiny">choosealicense.com</div>
                                                        </Link>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    }


                    <div className="overflow-auto">

                        <Tabs variant="underlined" selectedKey={hashKey} aria-label="Dataset tabs"
                              classNames={{tabList: 'pb-0'}}>
                            <Tab key="about" href="#" title={<div className="inline-flex items-center space-x-3">
                                <InformationCircleIcon className="w-4 h-4"/>
                                <span>About</span>
                            </div>}/>
                            <Tab key="dataset-preview" href="#dataset-preview"
                                 title={<div className="inline-flex items-center space-x-3">
                                     <TableCellsIcon className="w-4 h-4"/>
                                     <span>Dataset preview</span>
                                 </div>}/>
                            <Tab key="artifacts" href="#artifacts"
                                 title={<div className="inline-flex items-center space-x-3">
                                     <FolderOpenIcon
                                         className="w-4 h-4"/>
                                     <span>Artifacts</span>
                                 </div>}/>
                        </Tabs>
                    </div>
                </div>

            </div>


            <Divider
                className="bg-default-200/75"
            />

            {
                hashKey === 'about' &&

                <div className="flex gap-x-8 gap-y-4 px-8 py-8 justify-center">

                    <div className="inline-flex max-w-screen-lg grow flex-wrap md:flex-nowrap gap-y-8 gap-x-12">


                        {/*<Divider/>*/}

                        <div className="space-y-4 shrink grow">

                            <Skeleton isLoaded={isLoaded} className="rounded-lg">

                                <div className="space-y-6">
                                    {/*<p className="text-sm font-semibold py-2 inline-flex items-center gap-x-1"><CameraIcon*/}
                                    {/*    className="w-4 h-4 inline text-primary"/>Image specifications</p>*/}

                                    {/*<p className="max-w-prose min-w-24 leading-relaxed shrink">{"We are collecting copyright free, AI generated and real images in all styles." ?? "Lorem ipsum"}</p>*/}

                                    {
                                        descriptionSections.map((section, index) => {
                                            return <div key={index} className="space-y-2">
                                                <p className="text-sm font-semibold inline-flex items-center gap-x-2">{section.icon ?? <></>}{section.title}</p>
                                                <p className="max-w-prose min-w-24 leading-relaxed shrink">{section.content}</p>
                                            </div>
                                        })
                                    }


                                    {/*<p className="text-sm font-semibold py-2">Description</p>*/}

                                    {/*<p className="max-w-prose min-w-24 leading-relaxed shrink">{dataset?.description ?? "Lorem ipsum"}</p>*/}

                                    {/*<p className="text-sm font-semibold py-2 inline-flex items-center gap-x-1"><CameraIcon*/}
                                    {/*    className="w-4 h-4 inline text-primary"/>Image specifications</p>*/}

                                    {/*<p className="max-w-prose min-w-24 leading-relaxed shrink">{"We are collecting copyright free, AI generated and real images in all styles." ?? "Lorem ipsum"}</p>*/}

                                    {/*<p className="text-sm font-semibold py-2 inline-flex items-center gap-x-1"><TagIcon*/}
                                    {/*    className="w-4 h-4 inline text-danger"/>Labeling specifications</p>*/}

                                    {/*<p className="max-w-prose min-w-24 leading-relaxed shrink">{"Both booru tag and natural language labeling formats are recommended to be submit with every labeling action" ?? "Lorem ipsum"}</p>*/}

                                    {/*<p className="text-sm font-semibold py-2 inline-flex items-center gap-x-1">*/}
                                    {/*    <ExclamationTriangleIcon className="w-4 h-4 inline text-warning"/>Content maturity*/}
                                    {/*    guidelines</p>*/}

                                    {/*<p className="max-w-prose min-w-24 leading-relaxed shrink">{"Most NSFW content is permitted, except for gore and extreme violence." ?? "Lorem ipsum"}</p>*/}

                                    {/*<p className="text-sm font-semibold py-2 inline-flex items-center gap-x-1"><EyeIcon*/}
                                    {/*    className="w-4 h-4 inline text-secondary"/>Vision Language Model (VLM) guidelines*/}
                                    {/*</p>*/}

                                    {/*<p className="max-w-prose min-w-24 leading-relaxed shrink">{"AI generated image labeling must be done with CogVLM." ?? "Lorem ipsum"}</p>*/}
                                </div>
                            </Skeleton>

                            <div
                                className="flex gap-2 flex-wrap items-center"
                            >{
                                dataset?.tags.map((tag, index) => {
                                    return <Chip key={index} variant="flat" size="sm" color="default" radius="sm"
                                                 startContent={<HashtagIcon className="w-4 h-4 text-default-400"/>}>
                                        {tag}
                                    </Chip>
                                })
                            }</div>


                            <Skeleton isLoaded={isLoaded} className="rounded-lg">

                                <p className="text-sm text-default-500 font-medium">Created {TimestampFormat.shortest(dataset?.createdAt ?? 0)} •
                                    Updated {TimestampFormat.shortest(dataset?.updatedAt ?? 0)}</p>
                            </Skeleton>
                        </div>

                        <Divider orientation="vertical" className="hidden md:block relative"/>
                        <Divider orientation="horizontal" className="block md:hidden relative"/>


                        <div className="space-y-6 shrink-0">

                            <Button
                                className="w-[250px] h-16 flex"
                                startContent={<PencilSquareIcon className="w-5 h-5"/>}
                                variant="shadow"
                                color="primary"
                            >
                                <div className="inline-flex flex-col items-start">

                                    <p className="font-medium">Contribute</p>
                                    <p className="text-tiny">Open image labeling editor</p>
                                </div>
                            </Button>

                            {/*<Button*/}
                            {/*    className="w-[250px] h-16 flex"*/}
                            {/*    startContent={<ArrowUpTrayIcon className="w-5 h-5"/>}*/}
                            {/*    variant="flat"*/}
                            {/*    color="primary"*/}
                            {/*>*/}
                            {/*    <div className="inline-flex flex-col items-start">*/}

                            {/*        <p className="font-medium">Upload images</p>*/}
                            {/*        <p className="text-tiny">Help dataset reach size goals</p>*/}
                            {/*    </div>*/}
                            {/*</Button>*/}
                            <UploadImagesView/>

                            <Skeleton isLoaded={isLoaded} className="rounded-lg">
                                <Card shadow="sm">
                                    <CardHeader className="pb-0">

                                        <span className="text-base font-semibold">Goal</span>
                                    </CardHeader>

                                    <CardBody>

                                        <p className="text-2xl font-semibold">{numeral(40090).format('0a').toUpperCase()} {DatasetTaskLocalizations.getModalityName(dataset?.task)}</p>
                                    </CardBody>
                                </Card>
                            </Skeleton>

                            <Skeleton isLoaded={isLoaded} className="rounded-lg">
                                <Card shadow="sm">
                                    <CardHeader className="pb-0">

                                        <span className="text-base font-semibold">Collected</span>
                                    </CardHeader>

                                    <CardBody>
                                        <CircularProgress
                                            aria-label={"Collected progress"}
                                            // label="Collected"
                                            classNames={{
                                                label: "text-xs font-medium",
                                                value: "font-bold"
                                            }}
                                            size="lg"
                                            value={((dataset?.size ?? 0) / (dataset?.completionGoal ?? 1)) * 100}
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

                                        <span className="text-base font-semibold">Labeled</span>
                                    </CardHeader>

                                    <CardBody>

                                        <CircularProgress
                                            aria-label={"Labeled progress"}
                                            classNames={{
                                                label: "text-xs font-medium",
                                                value: "font-bold"
                                            }}
                                            // label="Labeled"
                                            size="lg"
                                            value={((dataset?.completionAmount ?? 0) / (dataset?.completionGoal ?? 1)) * 100}
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


            {
                hashKey === 'dataset-preview' &&

                <div className="grow relative">

                    <div className="absolute top-0 bottom-0 left-0 right-0">
                        <ImageLabelingDatasetPreview
                            actions={ipsumLabelingActions}/>
                    </div>

                </div>
                // <div className=" gap-x-8 gap-y-4 px-8 py-8 justify-center">
                //
                //     <div className="flex-wrap md:flex-nowrap gap-y-8 gap-x-12">
                //
                //         <ImageLabelingDatasetPreview actions={
                //
                //             Array.from({length: 50}).map(() => ipsumLabelingActionFactory())
                //         }/>
                //
                //     </div>
                //
                // </div>
            }


            {
                hashKey === 'artifacts' &&

                <div className="flex gap-x-8 gap-y-4 px-8 py-8 justify-center">

                    <div className="inline-flex max-w-screen-lg flex-col gap-y-8 gap-x-12 grow">


                        {/*<div className="space-y-3">*/}

                        {/*    <Skeleton isLoaded={isLoaded} className="rounded-lg">*/}

                        {/*        <p className="text-sm text-default-500 font-medium">*/}
                        {/*            Last bundled {TimestampFormat.shortest(dataset?.updatedAt ?? 0)}</p>*/}
                        {/*    </Skeleton>*/}

                        {/*    <Link href={'#'} color="primary" showAnchorIcon={true}>Download dataset on HuggingFace</Link>*/}
                        {/*</div>*/}

                        <ArtifactsView/>



                    </div>
                </div>
            }


        </div>

    </div>
}

export default DatasetDetailView