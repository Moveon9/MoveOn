export const fetchRankingData = async() => {
    try {
        const response = await fetch('http://54.79.175.116/stepRecord/ranking')
        if (!response.ok){
            throw new Error('Failed to fetch rankings');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};