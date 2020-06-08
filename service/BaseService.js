export default function () {
  const LIST_API = `http://pkr5vcnw9rj0.cloud.wavemakeronline.com/PEOPLE/services/people/people?size=10&page=1`;
  const DETAIL_API = `http://pkr5vcnw9rj0.cloud.wavemakeronline.com/PEOPLE/services/people/personById?pid=2`;
  const getPeopleList = () => {};
  const getPeopleDetail = () => {};
  return {
    getPeopleList,
    getPeopleDetail,
  };
}
