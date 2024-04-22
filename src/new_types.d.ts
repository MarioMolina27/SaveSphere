export interface GameSearchResponse {
    id:     string;
    slug:   string;
    title:  string;
    type:   string;
    mature: boolean;
}


export interface PricesResponse {
    id:    string;
    deals: Deal[];
}

export interface Deal {
    shop:       Shop;
    price:      HistoryLow;
    regular:    HistoryLow;
    cut:        number;
    voucher:    null;
    storeLow:   HistoryLow;
    historyLow: HistoryLow;
    flag:       string;
    drm:        DRM[];
    platforms:  Shop[];
    timestamp:  Date;
    expiry:     Date | null;
    url:        string;
}

export interface DRM {
}

export interface HistoryLow {
    amount:    number;
    amountInt: number;
    currency:  string;
}

export interface Shop {
    id:   number;
    name: string;
}

export interface BundleResponse {
    id:       number;
    title:    string;
    page:     Page;
    url:      string;
    isMature: boolean;
    publish:  Date;
    expiry:   Date;
    counts:   Counts;
    tiers:    Tier[];
}

export interface Counts {
    games: number;
    media: number;
}

export interface Page {
    id:   number;
    name: string;
}

export interface Tier {
    price: Price;
    games: Game[];
}

export interface Game {
    id:     string;
    slug:   string;
    title:  string;
    type:   string;
    mature: boolean;
}

export interface Price {
    amount:    number;
    amountInt: number;
    currency:  string;
}
