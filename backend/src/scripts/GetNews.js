import fs from 'fs';
import axios from 'axios';


async function GetLatestNews() {
    console.log("Getting latest news");
    //fetch finance news using CNBC scrapped APIs
    const topNews = await GetTopNews();
    // console.log(topNews);
    //write the top news to a file
    await WriteToFile(topNews);

    //if unique found get the complete article from the link
    //update topnews
    //call nandini api (payload => title and descritpion) and get the companies

    for (let i = 0; i < topNews.length; i++) {
        const news = topNews[i];
        const companies = await GetAffectedCompanyNamesAPI(news.title + " " + news.description);
        console.log(companies);
    }

    //for each company call the chatgpt api (payload => company name and the description with prompt) and get the summarised string
    //for each company call ayush api (payload => send the summarised string) and get the priorityLevel
    //log the company and the priority level   
}
//getting top 5 news
async function GetTopNews() {
    try {
        const financeNews = await axios.get('https://webql-redesign.cnbcfm.com/graphql?operationName=getAssetList&variables=%7B%22id%22%3A%2210000664%22%2C%22offset%22%3A34%2C%22pageSize%22%3A24%2C%22nonFilter%22%3Atrue%2C%22includeNative%22%3Afalse%2C%22include%22%3A%5B%5D%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%2243ed5bcff58371b2637d1f860e593e2b56295195169a5e46209ba0abb85288b7%22%7D%7D');
        // console.log(financeNews.data.data.assetList.assets);
        //extract title , description and url, headline from each object in the array and store in a new array
        const newsArray = financeNews.data.data.assetList.assets.map((news) => {
            return {
                title: news.title,
                description: news.description,
                url: news.url,
                headline: news.headline
            }
        });
        // console.log(newsArray);
        //get the top x news from the array
        const topNews = newsArray.slice(0, 5);
        // console.log(topNews);
        return topNews;
    } catch (error) {
        console.log("Error in fetching news", error);
    }
}

async function WriteToFile(data) {
    const filePath = "./src/scripts/TopNews.json";
    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log('Top news has been saved to topNews.json');
        }
    });
}

async function GetAffectedCompanyNamesAPI(payload) {
    //call nandini api (payload => title and descritpion) and get the companies
    try {
        const response = await query({ "inputs": payload });
        //filter the response to get word parameter of each object in the array
        const companies = response.map((company) => company.word);
        // Getting unique company names using Set
        const uniqueCompanies = [...new Set(companies)];
        return companies;
    } catch (error) {
        console.log("Error in fetching companies", error);
    }
}

async function query(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/nbroad/deberta-v3-base-company-names",
        {
            headers: { Authorization: `Bearer ${process.env.NANDINI_API_KEY}` },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result = await response.json();
    return result;
}

export { GetLatestNews };