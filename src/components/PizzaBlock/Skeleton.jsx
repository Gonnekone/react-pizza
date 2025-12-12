import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = () => (
    <ContentLoader
        className={"pizza-block"}
        speed={2}
        width={280}
        height={490}
        viewBox="0 0 280 466"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <circle cx="136" cy="120" r="120" />
        <rect x="24" y="254" rx="24" ry="24" width="228" height="32" />
        <rect x="0" y="304" rx="11" ry="11" width="280" height="88" />
        <rect x="0" y="420" rx="11" ry="11" width="95" height="34" />
        <rect x="134" y="413" rx="31" ry="31" width="146" height="51" />
    </ContentLoader>
)

export default Skeleton

