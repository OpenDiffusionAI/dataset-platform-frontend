import {Button, Input, Pagination} from "@nextui-org/react";
import {MagnifyingGlassIcon} from "@heroicons/react/20/solid";
import DatasetListItem from "./DatasetListItem/DatasetListItem.tsx";
import {faker} from "@faker-js/faker";
import {useEffect, useState} from "react";
import numeral from 'numeral'
import DatasetListItemData from "../../types/DatasetListItemData.ts";
import {useSearchParams} from "react-router-dom";

type QueryStatistics = {
    results: number;
    time: number;
}

const ipsumDataset: DatasetListItemData = {
    id: faker.string.uuid(),
    name: 'OpenDiffusion',
    description: 'A dataset focused on achieving pixel precision for sharper images. A dataset focused on achieving pixel precision for sharper images. A dataset focused on achieving pixel precision for sharper images.',
    coverImageUrl: '',
    tags: ['Pixel Precision'],
    size: 40090,
    completionGoal: 50000,
    completionAmount: 3000,
    open: true,
    task: 'image-labeling',
    createdAt: faker.date.recent().getTime(),
    updatedAt: faker.date.recent().getTime(),
    owner: {
        id: faker.string.uuid(),
        username: faker.internet.userName(),
        avatarUrl: '',
        verified: false
    }
}

const ipsumDatasets: DatasetListItemData[] = [
    {
        id: faker.string.uuid(),
        name: 'OpenDiffusion',
        description: 'A dataset focused on achieving pixel precision for sharper images. A dataset focused on achieving pixel precision for sharper images. A dataset focused on achieving pixel precision for sharper images.',
        coverImageUrl: `https://picsum.photos/seed/${faker.number.int({min: 0, max: 100})}/500/300`,
        tags: ['Pixel Precision'],
        size: 40090,
        completionGoal: 50000,
        completionAmount: 3000,
        open: true,
        task: 'image-labeling',
        createdAt: faker.date.recent().getTime(),
        updatedAt: faker.date.recent().getTime(),
        owner: {
            id: faker.string.uuid(),
            username: faker.internet.userName(),
            avatarUrl: faker.image.avatar(),
            verified: false
        }
    },
    {
        id: faker.string.uuid(),
        name: 'OpenDiffusion',
        description: 'A dataset focused on achieving pixel precision for sharper images. A dataset focused on achieving pixel precision for sharper images. A dataset focused on achieving pixel precision for sharper images.',
        coverImageUrl: `https://picsum.photos/seed/${faker.number.int({min: 0, max: 100})}/500/300`,
        tags: ['Pixel Precision'],
        size: 40090,
        completionGoal: 50000,
        completionAmount: 3000,
        open: true,
        task: 'image-labeling',
        createdAt: faker.date.recent().getTime(),
        updatedAt: faker.date.recent().getTime(),
        owner: {
            id: faker.string.uuid(),
            username: faker.internet.userName(),
            avatarUrl: faker.image.avatar(),
            verified: true
        }
    }
]

const DatasetsView = () => {

    const [searchParams] = useSearchParams()
    const search = searchParams.get('q') ?? ""

    const [searchQuery, setSearchQuery] = useState(search)
    const [queryStatistics, setQueryStatistics] = useState<QueryStatistics | null>(null)
    const [datasets, setDatasets] = useState<DatasetListItemData[] | null>(null)
    const [isLoadingItems, setIsLoadingItems] = useState(false)


    const isLoading = !datasets || isLoadingItems


    const requestDatasets = async (query?: string='') => {
        setIsLoadingItems(true)
        await new Promise(resolve => setTimeout(resolve, faker.number.int({min: 200, max: 500})))

        const datasets = ipsumDatasets
        setDatasets(datasets)
        setIsLoadingItems(false)

        return datasets
    }

    const performSearch = async () => {
        const startingTime = Date.now()
        const datasetResults = await requestDatasets(searchQuery)

        const elapsedTime = Date.now() - startingTime

        setQueryStatistics({
            results: numeral(datasetResults.length).format('0,'),
            time: numeral(elapsedTime / 1000).format('0.0')
        })

    }

    useEffect(() => {

        const delayDebounceFn = setTimeout(() => {
            // if(searchQuery === '')
            //     return

            performSearch()
                .then(() => {
                    // Handle success
                })
        }, 500)

        return () => clearTimeout(delayDebounceFn)

    }, [searchQuery]);

    // useEffect(() => {
    //     if(searchQuery !== '')
    //         return
    //
    //     requestDatasets(searchQuery)
    //         .then(() => {})
    // }, []);

    return <div className="px-8 py-8 flex items-center  flex-col grow">

        <div className="max-w-screen-lg w-full space-y-8 flex flex-col h-fit grow">


            <div className="space-y-4">

                <Input
                    value={searchQuery}
                    onValueChange={setSearchQuery}
                    // label="Search"
                    autoCorrect={'off'}
                    isClearable
                    radius="lg"
                    classNames={{
                        label: "text-black/50 dark:text-white/90",
                        input: [
                            "bg-transparent",
                            "text-black/90 dark:text-white/90",
                            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                        ],
                        innerWrapper: "bg-transparent",
                        inputWrapper: [
                            "shadow-xl",
                            "bg-default-200/50",
                            "dark:bg-default/60",
                            "backdrop-blur-xl",
                            "backdrop-saturate-200",
                            "hover:bg-default-200/70",
                            "dark:hover:bg-default/70",
                            "group-data-[focus=true]:bg-default-200/50",
                            "dark:group-data-[focus=true]:bg-default/60",
                            "!cursor-text",
                        ],
                    }}
                    placeholder="Type to search..."
                    startContent={
                        <MagnifyingGlassIcon
                            className="w-5 h-5 text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0"/>
                    }
                    endContent={
                        <Button
                            onClick={performSearch}
                            size="sm"
                            radius="full"
                            variant="light"
                            color="primary"
                            endContent={<MagnifyingGlassIcon className="w-4 h-4"/>}
                        >
                            Search
                        </Button>
                    }
                />

                {
                    queryStatistics &&

                    <p className="text-xs text-default-400">Found {
                        numeral(queryStatistics.results).format('0,')
                    }&nbsp;results in {
                        numeral(queryStatistics.time).format('0.0')
                    }&nbsp;seconds</p>
                }

            </div>


            <div className="space-y-6 grow">

                {
                    isLoading &&
                    [1, 2, 3, 4].map((i) => <DatasetListItem
                        key={i}
                        dataset={ipsumDataset}
                        isLoaded={false}
                    />)
                }

                {
                    !isLoading &&
                    datasets.map((dataset, i) =>
                        <DatasetListItem
                            key={i}
                            dataset={dataset}
                        />
                    )
                }

            </div>

            {
                datasets &&
                <Pagination showControls total={10} initialPage={1} className="self-center" />
            }

        </div>
    </div>
}

export default DatasetsView