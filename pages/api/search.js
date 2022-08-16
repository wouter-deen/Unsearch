import SearchEngine from "@/dependencies/cdrake-se/index";

export default async function handler(req, res) {
  const {method, query, pageNum, languageISO} = req.body;
  return new Promise(async (resolve, reject) => {
    try {
      const result = await SearchEngine({
        Method: method,
        Query: query,
        Page: pageNum,
        // ! Language for the search
        Language: languageISO
      });
      res.status(200).json(result);
      return resolve();
    } catch (SearchRuntimeError) {
      console.log(SearchRuntimeError);
      return reject();
    }
  })
}
