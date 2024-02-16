import { Card, Metric, Text, Title } from "@tremor/react";
import React from "react";

interface Props {
    name: string;
    shop: string;
    status: string;
}

enum Status {
    expired = "expired",
    aviliable = "aviliable"
}

export const Bundle: React.FC<Props> = ({ name, shop, status }) => {
    const statusColor = status === Status.expired ? "red" : "green";
    return (
        <Card className="mx-auto mb-7" decoration="top" decorationColor="slate">
            <Title className="mb-2">{name}</Title>
            <Metric>{shop}</Metric>
            <Text className='mt-2' color={statusColor}>{status}</Text>
        </Card>
    )
}