import { prisma } from './prisma.client';
import { ExamType, BandLevel, SkillType } from '../common/enums';
import { BAND_TIER_CONFIGS } from '../../../shared/constants/ielts-levels';

async function main() {
  console.log('🌱 Starting IELTS Master Database Seed...');

  // 1. Tạo User mẫu 1: Luyện thi IELTS Academic bắt đầu từ Mất gốc
  const academicUser = await prisma.user.upsert({
    where: { email: 'student.academic@ieltsmaster.com' },
    update: {},
    create: {
      email: 'student.academic@ieltsmaster.com',
      fullName: 'Nguyễn Văn Minh (Academic Candidate)',
      role: 'STUDENT',
      targetExamType: ExamType.ACADEMIC,
      targetOverallBand: 7.0,
      currentOverallBand: 3.0,
      overallTier: BandLevel.ZERO_FOUNDATION,
    },
  });

  console.log(`✅ Created/Found Academic User: ${academicUser.fullName} (${academicUser.id})`);

  // Tạo hồ sơ 4 kỹ năng cho Academic User
  const academicSkills = [
    { skill: SkillType.LISTENING, currentBand: 3.0, currentTier: BandLevel.ZERO_FOUNDATION, targetBand: 7.0, targetTier: BandLevel.BAND_6_0_TO_7_5 },
    { skill: SkillType.SPEAKING, currentBand: 2.5, currentTier: BandLevel.ZERO_FOUNDATION, targetBand: 6.5, targetTier: BandLevel.BAND_6_0_TO_7_5 },
    { skill: SkillType.READING, currentBand: 3.5, currentTier: BandLevel.BELOW_4_5, targetBand: 7.5, targetTier: BandLevel.BAND_7_5_PLUS },
    { skill: SkillType.WRITING, currentBand: 3.0, currentTier: BandLevel.ZERO_FOUNDATION, targetBand: 6.5, targetTier: BandLevel.BAND_6_0_TO_7_5 },
  ];

  for (const item of academicSkills) {
    await prisma.userSkillProfile.upsert({
      where: {
        userId_skill: {
          userId: academicUser.id,
          skill: item.skill,
        },
      },
      update: {},
      create: {
        userId: academicUser.id,
        skill: item.skill,
        currentBand: item.currentBand,
        currentTier: item.currentTier,
        targetBand: item.targetBand,
        targetTier: item.targetTier,
        strengths: JSON.stringify(['Chăm chỉ', 'Có tính kỷ luật cao']),
        weaknesses: JSON.stringify(['Thiếu từ vựng học thuật', 'Phát âm chưa chuẩn IPA']),
      },
    });
  }

  // Tạo LearningPath cho Academic User
  const academicPath = await prisma.learningPath.create({
    data: {
      userId: academicUser.id,
      title: 'Lộ trình Bứt phá IELTS Academic: Từ Mất Gốc đến 7.0+',
      description: 'Lộ trình cá nhân hóa tập trung vào phát triển tư duy học thuật, biểu đồ Task 1 và đọc báo khoa học',
      examType: ExamType.ACADEMIC,
      startOverallTier: BandLevel.ZERO_FOUNDATION,
      targetOverallTier: BandLevel.BAND_6_0_TO_7_5,
      targetOverallBand: 7.0,
      estimatedWeeks: 24,
      weeklyHoursCommitment: 12,
      status: 'ACTIVE',
      totalModulesCount: 8,
      completedModulesCount: 1,
    },
  });

  // Tạo các module mẫu trong LearningPath của Academic
  await prisma.learningModule.createMany({
    data: [
      {
        learningPathId: academicPath.id,
        skill: SkillType.LISTENING,
        tier: BandLevel.ZERO_FOUNDATION,
        examType: ExamType.ACADEMIC,
        title: 'Nền tảng Nghe: Nhận diện Bảng chữ cái, Con số & Tên riêng trong IELTS',
        orderIndex: 1,
        estimatedMinutes: 120,
        status: 'COMPLETED',
      },
      {
        learningPathId: academicPath.id,
        skill: SkillType.READING,
        tier: BandLevel.BELOW_4_5,
        examType: ExamType.ACADEMIC,
        title: 'Academic Reading: Kỹ thuật Skimming & Scanning bài báo khoa học ngắn',
        orderIndex: 2,
        estimatedMinutes: 90,
        status: 'IN_PROGRESS',
      },
      {
        learningPathId: academicPath.id,
        skill: SkillType.WRITING,
        tier: BandLevel.BAND_4_5_TO_6_0,
        examType: ExamType.ACADEMIC,
        title: 'Academic Writing Task 1: Phân tích biểu đồ đường (Line Graph) và viết Overview chuẩn',
        orderIndex: 3,
        estimatedMinutes: 150,
        status: 'LOCKED',
      },
    ],
  });

  // 2. Tạo User mẫu 2: Luyện thi IELTS General Training định cư Canada (Mục tiêu CLB 9 tương đương 7.5 - 8.0)
  const generalUser = await prisma.user.upsert({
    where: { email: 'candidate.general@ieltsmaster.com' },
    update: {},
    create: {
      email: 'candidate.general@ieltsmaster.com',
      fullName: 'Trần Thị Hạnh (General Training Candidate)',
      role: 'STUDENT',
      targetExamType: ExamType.GENERAL_TRAINING,
      targetOverallBand: 7.5,
      currentOverallBand: 5.5,
      overallTier: BandLevel.BAND_4_5_TO_6_0,
    },
  });

  console.log(`✅ Created/Found General Training User: ${generalUser.fullName} (${generalUser.id})`);

  // Tạo LearningPath cho General Training User
  const generalPath = await prisma.learningPath.create({
    data: {
      userId: generalUser.id,
      title: 'Lộ trình Chinh phục IELTS General Training: Bứt phá 5.5 lên 7.5+',
      description: 'Tối ưu hóa kỹ năng viết thư Task 1 công sở và xử lý các văn bản xã hội đời thường',
      examType: ExamType.GENERAL_TRAINING,
      startOverallTier: BandLevel.BAND_4_5_TO_6_0,
      targetOverallTier: BandLevel.BAND_7_5_PLUS,
      targetOverallBand: 7.5,
      estimatedWeeks: 16,
      weeklyHoursCommitment: 10,
      status: 'ACTIVE',
      totalModulesCount: 6,
      completedModulesCount: 2,
    },
  });

  await prisma.learningModule.createMany({
    data: [
      {
        learningPathId: generalPath.id,
        skill: SkillType.WRITING,
        tier: BandLevel.BAND_6_0_TO_7_5,
        examType: ExamType.GENERAL_TRAINING,
        title: 'General Writing Task 1: Viết thư khiếu nại (Letter of Complaint) văn phong Formal',
        orderIndex: 1,
        estimatedMinutes: 90,
        status: 'COMPLETED',
      },
      {
        learningPathId: generalPath.id,
        skill: SkillType.READING,
        tier: BandLevel.BAND_6_0_TO_7_5,
        examType: ExamType.GENERAL_TRAINING,
        title: 'General Reading Section 1 & 2: Quét thông tin nhanh qua tờ rơi thông báo và hợp đồng lao động',
        orderIndex: 2,
        estimatedMinutes: 80,
        status: 'IN_PROGRESS',
      },
    ],
  });

  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during database seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
