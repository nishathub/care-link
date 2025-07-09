export const dynamic = 'force-dynamic';

import RecentNews from "@/components/HomeComponents/NewsComponent";

const News = () => {
  return (
    <div>
      <RecentNews isHomePage={false}></RecentNews>
    </div>
  );
};

export default News;
