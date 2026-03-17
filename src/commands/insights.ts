import { Command } from 'commander';
import { fetchAPI } from '../utils/api.js';
import { formatInsightCard, InsightItem } from '../utils/format.js';

interface InsightsResponse {
  data: InsightItem[];
  total: number;
}

export const insightsCommand = new Command('insights')
  .description('GitHub 트렌드 인사이트 조회')
  .option('-l, --latest <number>', '가져올 인사이트 수', '10')
  .option('--json', 'JSON 형식으로 출력')
  .action(async (options: { latest: string; json: boolean }) => {
    const limit = parseInt(options.latest, 10);
    if (isNaN(limit) || limit < 1) {
      process.stderr.write('오류: --latest 값은 양의 정수여야 합니다.\n');
      process.exit(1);
    }

    const response = await fetchAPI<InsightsResponse>('/api/v1/insights', { limit });

    if (options.json) {
      process.stdout.write(JSON.stringify(response) + '\n');
      process.exit(0);
    }

    const insights = response.data ?? [];
    if (insights.length === 0) {
      process.stdout.write('인사이트 데이터가 없습니다.\n');
      return;
    }

    insights.forEach((insight, index) => formatInsightCard(insight, index));
  });
