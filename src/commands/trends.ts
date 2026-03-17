import { Command } from 'commander';
import { fetchAPI } from '../utils/api.js';
import { formatTrendsTable, TrendMetricItem } from '../utils/format.js';

interface TrendsResponse {
  data: TrendMetricItem[];
  window: string;
}

export const trendsCommand = new Command('trends')
  .description('GitHub 트렌딩 레포지토리 조회')
  .option('-w, --window <window>', '시간 범위 (24h, 1w, 1m)', '24h')
  .option('--json', 'JSON 형식으로 출력')
  .action(async (options: { window: string; json: boolean }) => {
    const validWindows = ['24h', '1w', '1m'];
    if (!validWindows.includes(options.window)) {
      process.stderr.write(`오류: --window 값은 ${validWindows.join(', ')} 중 하나여야 합니다.\n`);
      process.exit(1);
    }

    const response = await fetchAPI<TrendsResponse>('/api/v1/trends', { window: options.window });

    if (options.json) {
      process.stdout.write(JSON.stringify(response) + '\n');
      process.exit(0);
    }

    formatTrendsTable(response, options.window);
  });
