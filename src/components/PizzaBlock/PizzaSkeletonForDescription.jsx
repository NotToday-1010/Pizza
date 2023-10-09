import React from "react"
import ContentLoader from "react-content-loader"

const PizzaSkeletonForDescription = ({divBlock}) => {
    return (
        <ContentLoader
            speed={2}
            width={divBlock}
            height={500}
            viewBox="0 0 100% 500"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <rect x={divBlock / 2 - 125} y="265" rx="15" ry="15" width="250" height="27"/>
            <rect x="0" y="310" rx="15" ry="15" width="100%" height="50"/>
            <circle cx={divBlock / 2} cy="125" r="125"/>
        </ContentLoader>
    )
}

export default PizzaSkeletonForDescription


