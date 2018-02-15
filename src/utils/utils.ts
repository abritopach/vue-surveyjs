export class Utils {

    chartData: any = [];

    getKeys(surveyResults: any) {
        return surveyResults[0].userAnswers.map((val: any, key: any) => {return val['textQuestion']});
    }

    formatDataChart(results: any, surveyResults: any) {
        let keys = this.getKeys(surveyResults);
        if (results.length > 0) {
            // Format Data to chart visualization.
            for (let i = 0; i < keys.length; i++) this.groupResultsByQuestion(i, results, surveyResults);
        }
        return this.chartData;
    }

    groupResultsByQuestion(index: any, results: any, surveyResults: any) {
        let keys = this.getKeys(surveyResults);
        let res = results.reduce(function(res: any, currentValue: any) {
            res.push(currentValue[keys[index]]);
            return res;
        }, []);
        
        this.chartData.push(res);
    }

} 