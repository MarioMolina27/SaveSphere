import { Bundle } from "./Bundle/Bundle"
import { Title, Metric, Card } from "@tremor/react";
import { BundlesData } from "../../types";
import { isExpired } from "../../utils/utils";

interface Props {
    bundles: BundlesData;
}

export function Bundles({ bundles }: Props) {
    return (
        <>
            <Title className="text-5xl font-bold mt-20 title mb-9">BUNDLES</Title>
            {bundles.bundles && bundles.bundles.length > 0 ? (
                bundles.bundles.map((bundle, index) => (
                    <Bundle
                        key={index}
                        name={bundle.title}
                        shop={bundle.bundle}
                        status={isExpired(bundle.expiry) ? "expired" : "available"}
                    />
                ))
            ) : (
                <Card className="mx-auto mb-7" decoration="top" decorationColor="slate">
                    
                    <Metric>No bundles aviliable at the moment.</Metric>
                    
                </Card>
            )}
        </>
    );
}
