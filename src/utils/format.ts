import chalk from 'chalk';

export interface Repository {
  id: string;
  github_url: string;
  name: string;
  description: string | null;
  language: string | null;
  total_stars: number;
  total_forks: number;
  updated_at: string;
}

export interface TrendMetricItem {
  id: string;
  snapshot_time: string;
  stars_24h: number;
  stars_1w: number;
  stars_1m: number;
  repository: Repository | null;
}

export interface Investment {
  id: string;
  round_type: string | null;
  investor_name: string | null;
  news_url: string | null;
}

export interface InsightItem {
  id: string;
  content: string;
  is_published: boolean;
  created_at: string;
  repository: Repository | null;
  investments: Investment[];
}

export function formatTrendsTable(data: { data?: TrendMetricItem[]; window?: string }, window: string): void {
  const items: TrendMetricItem[] = data.data ?? [];

  if (items.length === 0) {
    process.stdout.write(chalk.yellow('트렌드 데이터가 없습니다.\n'));
    return;
  }

  const header = chalk.cyan(
    `${'#'.padEnd(4)} ${'레포지토리'.padEnd(40)} ${'언어'.padEnd(15)} ${'Stars ↑'.padStart(10)} ${'총 Stars'.padStart(10)}`
  );
  process.stdout.write(header + '\n');
  process.stdout.write(chalk.cyan('─'.repeat(82)) + '\n');

  items.forEach((item, index) => {
    const rank = String(index + 1).padEnd(4);
    const name = (item.repository?.name ?? 'Unknown').padEnd(40);
    const lang = (item.repository?.language ?? '-').padEnd(15);
    const starCount = window === '1m' ? item.stars_1m : window === '1w' ? item.stars_1w : item.stars_24h;
    const starsUp = chalk.green(('+' + starCount).padStart(10));
    const totalStars = chalk.white(String(item.repository?.total_stars ?? 0).padStart(10));
    process.stdout.write(`${rank} ${name} ${lang} ${starsUp} ${totalStars}\n`);
  });
}

export function formatInsightCard(insight: InsightItem, index: number): void {
  process.stdout.write(chalk.cyan('─'.repeat(70)) + '\n');
  process.stdout.write(chalk.white(`[${index + 1}] `) + chalk.green(insight.repository?.name ?? '알 수 없음') + '\n');

  if (insight.investments && insight.investments.length > 0) {
    insight.investments.forEach((inv) => {
      const round = inv.round_type ?? '미공개';
      const investor = inv.investor_name ?? '미공개';
      process.stdout.write(chalk.yellow(`투자: ${round}`) + chalk.white(` - ${investor}`) + '\n');
    });
  }

  if (insight.created_at) {
    const date = new Date(insight.created_at).toLocaleDateString('ko-KR');
    process.stdout.write(chalk.yellow('날짜: ') + chalk.white(date) + '\n');
  }

  const body = insight.content ?? '';
  if (body) {
    // 마크다운에서 첫 200자만 표시
    const preview = body.length > 200 ? body.substring(0, 200) + '...' : body;
    process.stdout.write('\n' + chalk.white(preview) + '\n');
  }
  process.stdout.write('\n');
}
