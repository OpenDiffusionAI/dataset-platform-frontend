import {ExclamationTriangleIcon} from "@heroicons/react/16/solid";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBone, faSkullCrossbones} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import MaturityRating, {MaturityRatingLocalization} from "../../../types/MaturityRating.ts";
import {Chip} from "@nextui-org/react";

type RatingAxis = {
    name: string
    iconRenderer: () => React.ReactNode
    value: string
    ratingColorMapping: Record<string, string>
}

const MaturityRatingPreview = ({rating, open=true}: {rating: MaturityRating, open: boolean}) => {


    const ratingAxes: RatingAxis[] = [
        {
            name: 'NSFW',
            iconRenderer: () => (!open && rating.nsfw === 'safe') ? undefined : <ExclamationTriangleIcon
                className={`w-4 h-4 inline ${
                    rating.nsfw !== 'safe' && rating.nsfw !== 'not-rated' ? 'text-warning' : 'text-default-400'
                }`}
            />,
            value: rating.nsfw,
            ratingColorMapping: {
                'safe': 'success',
                'not-rated': 'default',
                'suggestive': 'warning',
                'explicit': 'danger'
            }
        },
        {
            name: 'Gore',
            iconRenderer: () => (!open && rating.gore === 'none') ? undefined : <FontAwesomeIcon
                icon={faBone}
                className={`w-4 h-4 inline ${
                    rating.gore !== 'none' && rating.gore !== 'not-rated' ? 'text-danger' : 'text-default-400'
                }`}
            />,
            value: rating.gore,
            ratingColorMapping: {
                'none': 'success',
                'not-rated': 'default',
                'mild': 'warning',
                'extreme': 'danger'
            }
        },
        {
            name: 'Violence',
            iconRenderer: () => (!open && rating.violence === 'none') ? undefined : <FontAwesomeIcon
                icon={faSkullCrossbones}
                className={`w-4 h-4 inline ${
                    rating.violence !== 'none' && rating.violence !== 'not-rated' ? 'text-secondary' : 'text-default-400'
                }`}
            />,
            value: rating.violence,
            ratingColorMapping: {
                'none': 'success',
                'not-rated': 'default',
                'mild': 'warning',
                'extreme': 'danger'
            }
        }
        ]

    const clamp = open ? 'line-clamp-none' : 'line-clamp-2'

    if(!open) {
        if(ratingAxes.every(axis => axis.value === 'not-rated')) {
            return 'Not Rated'
        }

        if(rating.violence === 'none' && rating.gore === 'none' && rating.nsfw === 'safe') {
            return 'Safe'
        }


        return <div className={clamp + " space-x-2"}>
            {
                ratingAxes
                    .filter(axis => axis.iconRenderer() !== undefined)
                    .map((axis, i) => <React.Fragment key={i}>
                    <div className="inline-flex items-center space-x-1">
                        {axis.iconRenderer()}
                    </div>
                </React.Fragment>)
            }
        </div>
    }

    {/*</p>)*/}
    // space-y-1
    // <p key={i} className="inline-flex items-center space-x-1">
    return <div
        className={clamp + " font-sans grid gap-x-2 gap-y-1"}
        style={{
            display: 'grid',
            gridTemplateColumns: 'auto auto',
            gridTemplateRows: 'auto auto',
            // gap: '10px'
        }}
    >
        {
            ratingAxes.map((axis, i) => <React.Fragment key={i}>
                <div className="inline-flex items-center space-x-2">
                    {axis.iconRenderer()}
                    <span>{axis.name}</span>
                </div>
                <Chip color={axis.ratingColorMapping[axis.value]} variant="flat" size="sm" >
                    {MaturityRatingLocalization.getRatingValue(axis.value)}
                </Chip>
                {/*<span className={axis.ratingColorMapping[axis.value]}>{axis.value}</span>*/}
            </React.Fragment>)
        }

        {/*<p className="inline-flex items-center space-x-1">*/}
        {/*    <ExclamationTriangleIcon*/}
        {/*        // className="w-4 h-4 inline text-warning"*/}
        {/*        className={`w-4 h-4 inline ${*/}
        {/*            rating.nsfw !== 'safe' && rating.nsfw !== 'not-rated' ? 'text-warning' : 'text-default-400'*/}
        {/*        }`}*/}
        {/*    />*/}
        {/*    <span>NSFW: {rating.nsfw}</span>*/}
        {/*</p>*/}
        {/*<p className="inline-flex items-center space-x-1">*/}
        {/*    <FontAwesomeIcon*/}
        {/*        icon={faBone}*/}
        {/*        className="w-4 h-4 inline text-danger"*/}
        {/*    />*/}
        {/*    <span>Gore: {rating.gore}</span>*/}
        {/*</p>*/}
        {/*<p className="inline-flex items-center space-x-1">*/}
        {/*    <FontAwesomeIcon*/}
        {/*        icon={faSkullCrossbones}*/}
        {/*        className={`w-4 h-4 inline ${*/}
        {/*            rating.violence !== 'none' && rating.violence !== 'not-rated' ? 'text-secondary' : 'text-default-400'*/}
        {/*        }`}*/}
        {/*    />*/}
        {/*    <span>Violence: {rating.violence}</span>*/}
        {/*</p>*/}
    </div>
}

export default MaturityRatingPreview