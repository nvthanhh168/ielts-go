/**
 * IELTS GO! - Benchmark Vocabulary Seed Data
 * Dữ liệu 10 từ vựng cốt lõi mẫu mực và siêu dữ liệu 22 Chủ đề x 5 Cấp độ Band
 */

import { IeltsBenchmarkDataset } from '../../../shared/types/benchmark-vocab';
import benchmarkJson from './official-benchmark-vocab.json';

export const IELTS_BENCHMARK_DATASET: IeltsBenchmarkDataset = benchmarkJson as unknown as IeltsBenchmarkDataset;

export const IELTS_BENCHMARK_METADATA = IELTS_BENCHMARK_DATASET.metadata;
export const IELTS_BENCHMARK_VOCABULARY = IELTS_BENCHMARK_DATASET.vocabulary;

export default IELTS_BENCHMARK_DATASET;
