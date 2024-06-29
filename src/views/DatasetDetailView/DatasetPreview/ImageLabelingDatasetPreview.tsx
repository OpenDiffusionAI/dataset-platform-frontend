import {Key, useCallback, useMemo, useState} from "react";
import {
    Divider,
    Pagination,
    SortDescriptor,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@nextui-org/react";
import {StarIcon} from "@heroicons/react/16/solid";
import MaturityRating from "../../../types/MaturityRating.ts";
import ImageLabelingAction from "../../../types/ImageLabelingAction.ts";
import MaturityRatingPreview from "./MaturityRatingPreview.tsx";
import {JsonViewer} from '@textea/json-viewer'

type ImageLabelingColumnKey = {
    name: string
    type: string
    key: string
    allowSorting: boolean
}

const imageLabelingColumnKeys: ImageLabelingColumnKey[] = [
    {name: 'Image', type: 'string', key: 'imageUrl', allowSorting: true},
    {name: 'Descriptions', type: /*'{[format]: {[tagger]: string}}'*/'object', key: 'descriptions', allowSorting: false},
    {name: 'Meta Attributes', type: 'object', key: 'metaAttributes', allowSorting: false},
    {name: 'Human Reviewed', type: 'boolean', key: 'wasHumanReviewed', allowSorting: true},
    {name: 'Human Edited', type: 'boolean', key: 'wasHumanEdited', allowSorting: true},
    {name: 'Maturity Rating', type: 'object', key: 'maturityRating', allowSorting: false},
    {name: 'Human Maturity Rating', type: 'boolean', key: 'hasHumanGeneratedMaturityRating', allowSorting: true},
    {name: 'Quality', type: 'int32', key: 'quality', allowSorting: true},
    {name: 'VLMs', type: 'string[]', key: 'vlms', allowSorting: false},
    {name: 'Elapsed Seconds', type: 'int32', key: 'elapsedSeconds', allowSorting: true},
]

const ImageLabelingDatasetPreview = ({actions}: {actions: ImageLabelingAction[]}) => {

    const [page, setPage] = useState(1);
    const rowsPerPage = 24;
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({ column: 'imageUrl', direction: 'ascending' });

    const pages = Math.ceil(actions.length / rowsPerPage);
    const [openRows, setOpenRows] = useState<string[]>([])

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        const slice = actions.slice(start, end)

        if(sortDescriptor.column === undefined || sortDescriptor.direction === undefined)
            return slice

        return slice.sort((a, b) => {
            const aVal = a[sortDescriptor.column as keyof ImageLabelingAction];
            const bVal = b[sortDescriptor.column as keyof ImageLabelingAction];

            if (aVal < bVal) {
                return sortDescriptor.direction === 'ascending' ? -1 : 1;
            }
            if (aVal > bVal) {
                return sortDescriptor.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
    }, [page, actions, sortDescriptor]);

    const renderCell = useCallback((item: Record<string,  any>, columnKey: Key, open: boolean) => {
        const clamp = open ? 'line-clamp-none' : 'line-clamp-2'
        const cellValue = item[columnKey as string];

        // console.log(open)

        switch (columnKey) {
            case "imageUrl":
                return <span className={clamp}>{cellValue}</span>
            case "maturityRating":
                const maturityRating = cellValue as MaturityRating

                if (maturityRating.gore !== undefined && maturityRating.nsfw !== undefined && maturityRating.violence !== undefined) {
                    return <MaturityRatingPreview rating={maturityRating} open={open}/>
                }
                return open ? <div onClick={event => event.stopPropagation()}>
                        <JsonViewer value={cellValue} className={clamp} rootName={false} displayDataTypes={false} enableClipboard={false}/>
                </div> :
                    <span className={clamp}>{JSON.stringify(cellValue)}</span>
            case "descriptions":
            case "metaAttributes":
                return open ? <div onClick={event => event.stopPropagation()}>
                        <JsonViewer value={cellValue} className={clamp} rootName={false} displayDataTypes={false} enableClipboard={false} />
                </div> :
                    <span className={clamp}>{JSON.stringify(cellValue)}</span>
            case "vlms":
                return <div className={clamp + ""}>{
                    cellValue.map((vlm: string, i: number) => (
                        <p key={i} className="whitespace-nowrap">{vlm}</p>
                    ))

                }</div>
            case "wasHumanReviewed":
            case "wasHumanEdited":
            case "hasHumanGeneratedMaturityRating":
                return cellValue ? 'Yes' : 'No'
            case "quality":
                return <div className="inline whitespace-nowrap">{
                    Array.from({length: 5}).map((_, i) => (
                        <StarIcon key={i}
                                  className={`w-4 h-4 inline leading-none ${cellValue > i ? 'text-yellow-400' : 'text-default-300'}`}/>
                    ))}
                </div>
            default:
                return cellValue;
        }
    }, []);



    const toggleOpenRow = (id: string) => {
        setOpenRows(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
    }

    const isRowOpen = (id: string) => openRows.includes(id)

    // console.log(openRows)
    // const allOpen = false

    return (
        <Table
            removeWrapper={true}
            isStriped={true}
            isHeaderSticky={true}
            key={openRows.length}
            // className="inline-flex flex-col gap-4 w-screen overflow-auto"
            // isCompact={true}
            // className=""
            // layout={'fixed'}
            // className="overflow-auto"
            aria-label="Example table with client side pagination"
            onSortChange={setSortDescriptor}
            sortDescriptor={sortDescriptor}
            bottomContent={
                <div className="flex w-full flex-col items-center">
                    <Divider
                        className="bg-default-200/75"
                    />

                    <Pagination
                        className="py-6"
                        size="sm"
                        isCompact
                        showControls
                        showShadow
                        color="secondary"
                        page={page}
                        total={pages}
                        onChange={(page) => setPage(page)}
                    />
                </div>
            }
            classNames={{
                // gap-4
                table: "inline overflow-auto",
                base: 'inline-flex h-full gap-0',
                // wrapper: "min-h-[222px]",
                tr: 'cursor-pointer',
                td: 'text-xs font-mono',
                // td: 'cursor-pointer'
                // td: allOpen ? 'min-w-fit max-w-sm break-words align-top' : 'min-w-fit max-w-sm break-words'
                // base: "overflow-auto",
                // table: "w-screen",
            }}
        >
            <TableHeader>
                {
                    imageLabelingColumnKeys.map((columnKey) => (
                        <TableColumn
                            key={columnKey.key}
                            allowsSorting={columnKey.allowSorting}
                        >
                            <div className="inline-block">
                                <p className="">{columnKey.name}</p>
                                <p className="font-medium text-default-400 font-mono">{columnKey.type}</p>
                            </div>
                        </TableColumn>
                    ))
                }
                {/*<TableColumn key="imageUrl" allowsSorting>Image</TableColumn>*/}
                {/*<TableColumn key="descriptions">Descriptions</TableColumn>*/}
                {/*<TableColumn key="metaAttributes">Meta Attributes</TableColumn>*/}
                {/*<TableColumn key="wasHumanReviewed" allowsSorting>Human Reviewed</TableColumn>*/}
                {/*<TableColumn key="wasHumanEdited" allowsSorting>Human Edited</TableColumn>*/}
                {/*<TableColumn key="maturityRating">Maturity Rating</TableColumn>*/}
                {/*<TableColumn key="hasHumanGeneratedMaturityRating">Human Maturity Rating</TableColumn>*/}
                {/*<TableColumn key="quality" allowsSorting>Quality</TableColumn>*/}
                {/*<TableColumn key="vlms">VLMs</TableColumn>*/}
                {/*<TableColumn key="elapsedSeconds" allowsSorting >Elapsed Seconds</TableColumn>*/}
            </TableHeader>
            <TableBody items={items} >
                {(item) => (
                    <TableRow
                        key={item.id}
                        onClick={() => toggleOpenRow(item.id)}
                    >
                        {(columnKey) => <TableCell
                            className={isRowOpen(item.id) ? 'min-w-fit max-w-sm break-words align-top' : 'min-w-fit max-w-sm break-words'}
                        >{
                            renderCell(item, columnKey, isRowOpen(item.id))
                        }</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}

export default ImageLabelingDatasetPreview