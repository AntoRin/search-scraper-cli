interface ISearchResult {
    status: string;
    data: {
    title: string;
    textContent: string[];
    links: string[];
    imageLinks: string[];
    videoLinks: string[];
    }    
}

export { ISearchResult };