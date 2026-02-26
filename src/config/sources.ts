import { NewsSource } from '@/types';

/**
 * 新闻源配置
 * 包括国内外主要 AI 相关新闻源
 */
export const NEWS_SOURCES: NewsSource[] = [
  // 国内新闻源
  {
    id: '36kr-ai',
    name: '36氪 AI',
    region: 'domestic',
    url: 'https://36kr.com/ai',
  },
  {
    id: 'huxiu-ai',
    name: '虎嗅 AI',
    region: 'domestic',
    url: 'https://www.huxiu.com/channel/ai',
  },
  {
    id: 'jiemian-ai',
    name: '界面新闻 AI',
    region: 'domestic',
    url: 'https://www.jiemian.com/lists/338.html',
  },
  {
    id: 'techcrunch-cn',
    name: 'TechCrunch 中文',
    region: 'domestic',
    url: 'https://cn.technode.com/category/ai/',
  },
  {
    id: 'qianwen-news',
    name: '千问资讯',
    region: 'domestic',
    url: 'https://tongyi.aliyun.com/',
  },
  {
    id: 'deepseek-news',
    name: 'DeepSeek',
    region: 'domestic',
    url: 'https://www.deepseek.com/news',
  },
  {
    id: 'tencent-ai',
    name: '腾讯 AI',
    region: 'domestic',
    url: 'https://ai.tencent.com/',
  },
  {
    id: 'bytedance-ai',
    name: '字节跳动 AI',
    region: 'domestic',
    url: 'https://www.doubao.com/',
  },
  {
    id: 'kimi-news',
    name: 'Kimi 智能助手',
    region: 'domestic',
    url: 'https://kimi.moonshot.cn/',
  },
  {
    id: 'leiphone-ai',
    name: '雷锋网 AI',
    region: 'domestic',
    url: 'https://www.leiphone.com/category/ai',
  },

  // 国际新闻源
  {
    id: 'anthropic-blog',
    name: 'Anthropic (Claude)',
    region: 'international',
    url: 'https://www.anthropic.com/news',
  },
  {
    id: 'google-ai',
    name: 'Google AI',
    region: 'international',
    url: 'https://blog.google/technology/ai/',
  },
  {
    id: 'microsoft-ai',
    name: 'Microsoft AI',
    region: 'international',
    url: 'https://blogs.microsoft.com/ai/',
  },
  {
    id: 'x-ai',
    name: 'xAI (Grok)',
    region: 'international',
    url: 'https://x.ai/blog',
  },
  {
    id: 'techcrunch-ai',
    name: 'TechCrunch AI',
    region: 'international',
    url: 'https://techcrunch.com/category/artificial-intelligence/',
  },
  {
    id: 'theverge-ai',
    name: 'The Verge AI',
    region: 'international',
    url: 'https://www.theverge.com/ai-artificial-intelligence',
  },
  {
    id: 'venturebeat-ai',
    name: 'VentureBeat AI',
    region: 'international',
    url: 'https://venturebeat.com/category/ai/',
  },
  {
    id: 'mit-ai',
    name: 'MIT AI News',
    region: 'international',
    url: 'https://news.mit.edu/topic/artificial-intelligence2',
  },
  {
    id: 'wired-ai',
    name: 'Wired AI',
    region: 'international',
    url: 'https://www.wired.com/category/artificial-intelligence/',
  },
  {
    id: 'arxiv-ai',
    name: 'arXiv AI',
    region: 'international',
    url: 'https://arxiv.org/list/cs.AI/recent',
  },
  {
    id: 'ai-news',
    name: 'AI News',
    region: 'international',
    url: 'https://artificialintelligence-news.com/',
  },
  {
    id: 'openai-twitter',
    name: 'OpenAI Updates',
    region: 'international',
    url: 'https://openai.com/blog',
  },
];

/**
 * 热门公司关键词
 */
export const HOT_COMPANIES = [
  // 国际
  'OpenAI', 'ChatGPT', 'GPT', 'Sora', 'DALL-E',
  'Google', 'Gemini', 'Bard', 'DeepMind',
  'Microsoft', 'Copilot', 'Azure AI', 'Codex',
  'xAI', 'Grok', 'X',
  'Anthropic', 'Claude',
  'Meta', 'Llama', 'Facebook AI',
  'NVIDIA', 'AMD', 'Apple', 'Amazon',
  'Midjourney', 'Stability AI', 'Hugging Face',
  'Cohere', 'Mistral', 'Perplexity',
  
  // 国内
  '千问', '通义', 'Qwen',
  'DeepSeek', '深度求索',
  '腾讯', '混元', 'Hunyuan',
  '字节跳动', '豆包', 'Doubao',
  'Kimi', 'Moonshot', '月之暗面',
  '百度', '文心', 'ERNIE',
  '阿里', '通义千问',
  '华为', '盘古',
  '科大讯飞', '讯飞星火',
  '智谱AI', 'ChatGLM', 'GLM',
  '月之暗面', 'Moonshot AI',
];

/**
 * AI 相关关键词
 */
export const AI_KEYWORDS = [
  // 英文关键词
  'artificial intelligence', 'AI', 'machine learning', 'deep learning',
  'LLM', 'large language model', 'GPT', 'ChatGPT', 'Claude', 'Gemini', 'Copilot',
  'transformer', 'neural network', 'computer vision', 'NLP', 'natural language processing',
  'generative AI', 'GenAI', 'AGI', 'foundation model', 'AI model',
  'diffusion model', 'stable diffusion', 'midjourney', 'DALL-E',
  'reinforcement learning', 'RLHF', 'fine-tuning', 'prompt engineering',
  'multimodal', 'vision-language', 'embeddings', 'RAG', 'vector database',
  
  // 中文关键词
  '人工智能', 'AI', '机器学习', '深度学习', '大模型', 'LLM',
  '生成式AI', 'AIGC', 'ChatGPT', 'Claude', '文心一言',
  '通义千问', 'Kimi', '豆包', '混元', '星火', '智谱',
  'GPT', 'GPT-4', 'GPT-4o', 'Sora', 'Midjourney',
  '神经网络', '自然语言处理', '计算机视觉',
  '强化学习', '多模态', '向量数据库', 'RAG',
  '提示词', 'Prompt', '微调', '推理', '算力',
  'GPU', 'CUDA', 'H100', 'A100', 'A800',
  'DeepSeek', '深度求索', 'Qwen', 'GLM', 'Doubao',
];

/**
 * 新闻分类映射
 */
export const CATEGORY_KEYWORDS: { [key: string]: string[] } = {
  industry: [
    '发布', '推出', '上线', '突破', '创新', '纪录',
    'launch', 'release', 'breakthrough', 'innovation', 'record',
    '合作', '收购', '融资', 'IPO', '上市',
  ],
  product: [
    '产品', '模型', '版本', '更新', '功能',
    'product', 'model', 'version', 'update', 'feature',
    'API', '平台', '工具', '应用', 'app',
  ],
  funding: [
    '融资', '投资', '估值', '独角兽', '轮',
    'funding', 'investment', 'valuation', 'unicorn', 'round',
    'B轮', 'C轮', 'IPO', '上市',
  ],
};

/**
 * 公司 Logo 映射
 * 使用 Logo API 获取公司 Logo
 */
export const COMPANY_LOGOS: { [key: string]: string } = {
  // 国际
  'OpenAI': 'https://logo.clearbit.com/openai.com',
  'ChatGPT': 'https://logo.clearbit.com/openai.com',
  'GPT': 'https://logo.clearbit.com/openai.com',
  'Google': 'https://logo.clearbit.com/google.com',
  'Gemini': 'https://logo.clearbit.com/google.com',
  'Microsoft': 'https://logo.clearbit.com/microsoft.com',
  'Copilot': 'https://logo.clearbit.com/microsoft.com',
  'xAI': 'https://logo.clearbit.com/x.ai',
  'Grok': 'https://logo.clearbit.com/x.ai',
  'Anthropic': 'https://logo.clearbit.com/anthropic.com',
  'Claude': 'https://logo.clearbit.com/anthropic.com',
  'Meta': 'https://logo.clearbit.com/meta.com',
  'Llama': 'https://logo.clearbit.com/meta.com',
  'NVIDIA': 'https://logo.clearbit.com/nvidia.com',
  'AMD': 'https://logo.clearbit.com/amd.com',
  'Apple': 'https://logo.clearbit.com/apple.com',
  'Amazon': 'https://logo.clearbit.com/amazon.com',

  // 国内
  '腾讯': 'https://logo.clearbit.com/tencent.com',
  '混元': 'https://logo.clearbit.com/tencent.com',
  '字节跳动': 'https://logo.clearbit.com/bytedance.com',
  '豆包': 'https://logo.clearbit.com/bytedance.com',
  'Doubao': 'https://logo.clearbit.com/bytedance.com',
  '百度': 'https://logo.clearbit.com/baidu.com',
  '文心': 'https://logo.clearbit.com/baidu.com',
  '阿里': 'https://logo.clearbit.com/alibaba.com',
  '通义千问': 'https://logo.clearbit.com/alibaba.com',
  'Qwen': 'https://logo.clearbit.com/alibaba.com',
  '华为': 'https://logo.clearbit.com/huawei.com',
  '盘古': 'https://logo.clearbit.com/huawei.com',
  'DeepSeek': 'https://cdn.deepseek.com/logo.png',
  '深度求索': 'https://cdn.deepseek.com/logo.png',
  '千问': 'https://logo.clearbit.com/alibaba.com',
  '通义': 'https://logo.clearbit.com/alibaba.com',
  '科大讯飞': 'https://logo.clearbit.com/iflytek.com',
  '讯飞星火': 'https://logo.clearbit.com/iflytek.com',
  '智谱AI': 'https://logo.clearbit.com/chatglm.cn',
  'ChatGLM': 'https://logo.clearbit.com/chatglm.cn',
  'GLM': 'https://logo.clearbit.com/chatglm.cn',
  '月之暗面': 'https://logo.clearbit.com/moonshot.cn',
  'Moonshot AI': 'https://logo.clearbit.com/moonshot.cn',
  'Kimi': 'https://logo.clearbit.com/moonshot.cn',
};

/**
 * 获取公司 Logo
 */
export function getCompanyLogo(companyName: string): string | undefined {
  console.log(companyName, 'companyName', COMPANY_LOGOS[companyName]);
  return COMPANY_LOGOS[companyName];
}
