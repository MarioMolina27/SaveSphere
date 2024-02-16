// API Response Types

export interface GameCurrent {
    ".meta": Meta;
    data:    Data;
}

export interface Meta {
    currency: string;
}

export interface Data {
    game: Game;
}

export interface GameCurrent {
    list: List[];
    urls: Urls;
}

export interface List {
    price_new: number;
    price_old: number;
    price_cut: number;
    url:       string;
    shop:      Shop;
    drm:       string[];
}

export interface Shop {
    id:   string;
    name: string;
}

export interface Urls {
    game: string;
}

export interface GameLowest {
    shop:  Shop;
    price: number;
    cut:   number;
    added: number;
    urls:  Urls;
}

export interface ShopLowest {
    id:   string;
    name: string;
}

export interface UrlsLowest {
    game:    string;
    history: string;
}

export interface Bundle {
    ".deprecated": boolean;
    data:          DataBundle;
}

export interface DataBundle {
    game: GameBundle;
}

export interface GameBundle {
    total: number;
    list:  ListBundle[];
    urls:  UrlsBundle;
}

export interface ListBundle {
    title:     string;
    bundle:    string;
    start:     number;
    expiry:    number;
    platforms: any[];
    url:       string;
}

export interface UrlsBundle {
    game:    string;
    bundles: string;
}

export interface GameInfoResponse {
    ".deprecated": boolean;
    dataGameInfo:  DataGameInfo;
}

export interface DataGameInfo {
    gameInfo: GameInfo;
}

export interface GameInfo {
    title:         string;
    image:         Greenlight;
    greenlight:    Greenlight;
    is_package:    boolean;
    is_dlc:        boolean;
    achievements:  boolean;
    trading_cards: boolean;
    early_access:  boolean;
    reviews:       Reviews;
    urlsGameInfo:  UrlsGameInfo;
}

export interface Greenlight {
}

export interface Reviews {
    steam: Steam;
}

export interface Steam {
    perc_positive: number;
    total:         number;
    text:          string;
    timestamp:     number;
}

export interface UrlsGameInfo {
    game:    string;
    history: string;
    package: string;
    dlc:     string;
}

export interface GameSearchResponse {
    ".deprecated": boolean;
    data:    DataSearch;
}

export interface DataSearch {
    results: Result[];
    urls:    UrlsGameSearch;
}

export interface Result {
    new_id: string;
    id:     number;
    plain:  string;
    title:  string;
}

export interface UrlsGameSearch {
    search: string;
}


// Object Types

interface GameData {
    priceNew: number;
    priceOld: number;
    shop: string;
}

export interface CurrentData {
    game?: GameData[];
}

export interface LowestData {
    priceNew: number;
    cut: number ;
    shop: string;
}

export interface BundlesData {
    bundles?: {
        title: string;
        bundle: string;
        expiry: string;
    }[];
}