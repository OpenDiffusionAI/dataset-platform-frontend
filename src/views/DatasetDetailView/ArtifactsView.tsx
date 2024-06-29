import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue, Link} from "@nextui-org/react";
import {useCallback} from "react";
import TimestampFormat from "../../utils/TimestampFormat.ts";
import {faker} from "@faker-js/faker";
import numeral from "numeral";

const statusColorMap = {
    active: "success",
    paused: "danger",
    vacation: "warning",
};

type Artifact = {
    id: string;
    name: string;
    url: string;
    size: number;
    bundledAt: number
}

const ArtifactsView = () => {

    const columns = [
        {name: "NAME", id: "name"},
        {name: "SIZE", id: "size"},
        {name: "BUNDLED AT", id: "bundledAt"},
    ];

    const users: Artifact[] = [
        {
            id: "1",
            name: "OpenDiffusion Dataset 6/28",
            url: "https://example.com",
            size: 6437467845,
            bundledAt: faker.date.recent({days: 1}).getTime()
        },
        {
            id: "2",
            name: "OpenDiffusion Dataset 6/29",
            url: "https://example.com",
            size: 3462462332,
            bundledAt: faker.date.recent({days: 1}).getTime()
        }
    ];

    const renderCell = useCallback((user: Artifact, columnKey: string) => {
        const cellValue = user[columnKey] as Artifact;

        switch (columnKey) {
            case "bundledAt":
                return (
                    <p className="text-bold text-sm whitespace-nowrap">{TimestampFormat.shortest(cellValue)}</p>
                );
            case "name":
                return (
                    <Link href={user.url} showAnchorIcon={true} isExternal={true}>
                        {cellValue}
                    </Link>
                );
                case "size":
                return (
                    <p className="text-bold text-sm">{numeral(cellValue).format("0.0 b")}</p>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <Table aria-label="Example table with custom cells">
            <TableHeader columns={columns}>
                {(column: Artifact) => (
                    <TableColumn key={column.id}>
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={users}>
                {(item: Artifact) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );

}

export default ArtifactsView