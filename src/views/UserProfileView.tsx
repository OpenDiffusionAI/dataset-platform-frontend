import {Avatar, Divider, Pagination, Skeleton, Snippet} from "@nextui-org/react";
import SiteUserSummary from "../components/SiteUserSummary/SiteUserSummary.tsx";
import {NavLink} from "react-router-dom";
import SiteUserData from "../types/SiteUserData.ts";
import {faker} from "@faker-js/faker";
import {useEffect, useState} from "react";
import DatasetListItem from "./DatasetsView/DatasetListItem/DatasetListItem.tsx";
import DatasetListItemData from "../types/DatasetListItemData.ts";

const ipsumUser: SiteUserData = {
    id: '1',
    username: faker.internet.userName(),
    avatarUrl: faker.image.avatar(),
    verified: false
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


const UserProfileView = ({userId}: {userId: string}) => {


    const [user, setUser] = useState<SiteUserData | null>(null)
    const [datasets, setDatasets] = useState<DatasetListItemData[]>([])
    const [isUserLoaded, setIsUserLoaded] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const fetchDataset = async () => {
        await new Promise(resolve => setTimeout(resolve, faker.number.int({min: 200, max: 500})))

        setDatasets(ipsumDatasets)
        setIsLoading(false)
    }

    const fetchUser = async () => {
        await new Promise(resolve => setTimeout(resolve, faker.number.int({min: 200, max: 500})))

        setUser(ipsumUser)
        setIsUserLoaded(true)
    }

    useEffect(() => {
        fetchDataset()
            .then(() => {})

        fetchUser()
            .then(() => {})
    }, [])

    return <div className="flex items-center flex-col grow">

        <div className="w-full flex flex-col h-fit grow">

            {/*max-w-screen-lg*/}
            <div className="flex gap-x-8 gap-y-4 bg-default-50/75 px-8 py-8 justify-center">

                <div className="space-y-4 max-w-screen-lg grow w-full">

                    <Skeleton isLoaded={isUserLoaded} className="rounded-lg w-fit">

                        <SiteUserSummary user={user ?? ipsumUser} isLoaded={isUserLoaded} size="md"/>


                    </Skeleton>
                </div>
            </div>

            <Divider
                className="bg-default-200/75"
            />
            <div className="px-8 py-8 flex items-center  flex-col grow">

                <div className="max-w-screen-lg w-full space-y-8 flex flex-col h-fit grow">

                    <h1 className="font-bold text-sm">Datasets</h1>

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
                        <Pagination showControls total={10} initialPage={1} className="self-center"/>
                    }

                </div>
            </div>

        </div>
    </div>
}

export default UserProfileView