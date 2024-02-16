import { Card, Metric, Text, ProgressBar, Grid, Col, Title  } from "@tremor/react";
import { MainImage } from "../MainImage/MainImage";
import { CurrentData, LowestData, GameInfo } from "../../types";


interface Props {
    currentData: CurrentData;
    lowestData: LowestData | undefined;
    gameInfoData: GameInfo;
}

export function GameStadistics ({ currentData, lowestData, gameInfoData }: Props){
    const game = currentData.game && currentData.game[0];
    const lowest = lowestData;
    const discountPercentage = Math.round(((game?.priceOld ?? 0) - (game?.priceNew ?? 0)) / (game?.priceOld ?? 1) * 100);
    

    return(
        <>
            <Title className="text-5xl font-bold mt-5 mb-9 title">GAME STADISTICS</Title>
            <Grid numCols={2} className="gap-6">
                <Col>
                    <MainImage imageUrl="/placeholder_img.webp" />
                    <Text className="mt-2">Name</Text>
                    <Metric className="game-name">{gameInfoData.title}</Metric>
                </Col>
                <Col>
                    <Card className="max-w-xs mx-auto mb-7">
                        <Text>Current price - {game?.shop ?? 'none'}</Text>
                        <Metric>{game?.priceNew ?? 'none'}</Metric>
                        <ProgressBar percentageValue={discountPercentage} color="slate" className="mt-3" />
                    </Card>

                    <Card className="max-w-xs mx-auto">
                        <Text>Lowest price - {lowest?.shop ?? 'none'}</Text>
                        <Metric>{lowest?.priceNew ?? 'none'}</Metric>
                        <ProgressBar percentageValue={lowest?.cut ?? 0} color="slate" className="mt-3" />
                    </Card>
                </Col>
            </Grid>
        </>
    )
}