import { PostsOverview } from "./_components/posts-overview";
import { PostMetrics } from "./_components/post-metrics";
import { RecentPosts } from "./_components/recent-posts";
import { EngagementChart } from "./_components/engagement-chart";

export default function Page() {
  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <PostMetrics />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 md:gap-6">
        <EngagementChart />
        <PostsOverview />
      </div>
      <RecentPosts />
    </div>
  );
}
