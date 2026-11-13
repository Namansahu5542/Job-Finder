import mongoose from "mongoose";
import dbConnect from "../src/lib/db.js";
import { initializeUserBoard } from "../src/lib/init-user-board.js";
import Board from "../src/models/board.js";
import Column from "../src/models/column.js";
import JobApplications from "../src/models/job_applications.js";
import UserCredential from "../src/models/User_Credential.js";
import UserData from "../src/models/User_Credentials_m2.js";

const SAMPLE_DATA = [
    {
        company: "Google",
        position: "Frontend Engineer",
        salary: "₹35,00,000",
        location: "Bengaluru, India",
        jobUrl: "https://careers.google.com/jobs/frontend-engineer",
        tags: "react, typescript, frontend",
        notes: "Referred by a friend. Applied on Monday.",
        description: "Build and maintain scalable web interfaces for Google products using React and TypeScript.",
    },
    {
        company: "Microsoft",
        position: "Software Development Engineer",
        salary: "₹32,00,000",
        location: "Hyderabad, India",
        jobUrl: "https://careers.microsoft.com/sde",
        tags: "c#, azure, backend",
        notes: "Online assessment scheduled next week.",
        description: "Design and develop cloud-based services on Azure with a focus on reliability and performance.",
    },
    {
        company: "Amazon",
        position: "SDE I",
        salary: "₹28,00,000",
        location: "Chennai, India",
        jobUrl: "https://amazon.jobs/sde-1",
        tags: "java, aws, backend",
        notes: "Prepare for leadership principles round.",
        description: "Develop highly available services for Amazon's e-commerce platform.",
    },
    {
        company: "Flipkart",
        position: "Full Stack Developer",
        salary: "₹26,00,000",
        location: "Bengaluru, India",
        jobUrl: "https://www.flipkartcareers.com/fullstack",
        tags: "node, react, fullstack",
        notes: "HR called, waiting for interview slot.",
        description: "Work across the stack to deliver features for millions of shoppers.",
    },
    {
        company: "Razorpay",
        position: "Backend Engineer",
        salary: "₹30,00,000",
        location: "Bengaluru, India",
        jobUrl: "https://razorpay.com/jobs/backend",
        tags: "golang, payments, microservices",
        notes: "Strong fintech focus. Good growth.",
        description: "Build payment infrastructure handling high-volume transactions securely.",
    },
    {
        company: "Swiggy",
        position: "Mobile Developer (Android)",
        salary: "₹24,00,000",
        location: "Bengaluru, India",
        jobUrl: "https://careers.swiggy.com/android",
        tags: "kotlin, android, mobile",
        notes: "Take-home assignment due Friday.",
        description: "Create smooth and fast Android experiences for food delivery users.",
    },
    {
        company: "Zomato",
        position: "Data Analyst",
        salary: "₹18,00,000",
        location: "Gurugram, India",
        jobUrl: "https://www.zomato.com/careers/data-analyst",
        tags: "sql, python, analytics",
        notes: "Brush up on SQL window functions.",
        description: "Analyse user behaviour and business metrics to drive product decisions.",
    },
    {
        company: "TCS",
        position: "Systems Engineer",
        salary: "₹7,00,000",
        location: "Lucknow, India",
        jobUrl: "https://www.tcs.com/careers/systems-engineer",
        tags: "java, entry-level, campus",
        notes: "Backup option. Stable but lower pay.",
        description: "Entry-level role working on enterprise client projects across domains.",
    },
    {
        company: "Infosys",
        position: "Technology Analyst",
        salary: "₹9,50,000",
        location: "Pune, India",
        jobUrl: "https://www.infosys.com/careers/technology-analyst",
        tags: "java, spring, consulting",
        notes: "Interview went well, awaiting feedback.",
        description: "Analyse requirements and develop enterprise software solutions for global clients.",
    },
    {
        company: "Atlassian",
        position: "Senior Software Engineer",
        salary: "₹55,00,000",
        location: "Remote, India",
        jobUrl: "https://www.atlassian.com/company/careers/senior-swe",
        tags: "java, remote, senior",
        notes: "Needs 4+ years experience. Apply later.",
        description: "Lead development of collaboration tools used by millions of teams worldwide.",
    },
    {
        company: "Paytm",
        position: "React Native Developer",
        salary: "₹22,00,000",
        location: "Noida, India",
        jobUrl: "https://paytm.com/careers/react-native",
        tags: "react-native, mobile, fintech",
        notes: "Portfolio review requested.",
        description: "Build cross-platform mobile features for India's popular payments app.",
    },
    {
        company: "Adobe",
        position: "Computer Scientist",
        salary: "₹45,00,000",
        location: "Noida, India",
        jobUrl: "https://careers.adobe.com/computer-scientist",
        tags: "c++, graphics, research",
        notes: "Strong DSA and system design needed.",
        description: "Research and build core algorithms powering creative software products.",
    },
    {
        company: "Zoho",
        position: "Member Technical Staff",
        salary: "₹12,00,000",
        location: "Chennai, India",
        jobUrl: "https://www.zoho.com/careers/mts",
        tags: "java, product, saas",
        notes: "Programming round cleared.",
        description: "Develop and enhance SaaS products used by businesses worldwide.",
    },
    {
        company: "Freshworks",
        position: "DevOps Engineer",
        salary: "₹27,00,000",
        location: "Chennai, India",
        jobUrl: "https://www.freshworks.com/company/careers/devops",
        tags: "docker, kubernetes, ci/cd",
        notes: "Revise Kubernetes networking.",
        description: "Manage CI/CD pipelines and cloud infrastructure for high-scale SaaS applications.",
    },
    {
        company: "Meesho",
        position: "Machine Learning Engineer",
        salary: "₹38,00,000",
        location: "Bengaluru, India",
        jobUrl: "https://www.meesho.io/jobs/ml-engineer",
        tags: "python, ml, recommendation",
        notes: "Interesting recommendation-system problems.",
        description: "Build and deploy ML models for personalised product recommendations.",
    },
];

async function getSeedUserId() {
    const configuredId = process.env.SEED_USER_ID?.trim();
    if (configuredId) return configuredId;

    const email = process.env.SEED_USER_EMAIL?.trim().toLowerCase();
    if (!email) {
        throw new Error("Set SEED_USER_EMAIL or SEED_USER_ID to the account that should receive the sample data.");
    }

    const provider = process.env.SEED_USER_PROVIDER?.trim().toLowerCase() || "github";
    if (provider === "credentials") {
        const user = await UserData.findOne({ email }).select("_id").lean();
        if (!user) {
            throw new Error(`No credentials account found for SEED_USER_EMAIL "${email}".`);
        }
        return user._id.toString();
    }

    const account = await UserCredential.findOne({ email, provider })
        .select("providerAccountId")
        .lean();
    if (!account) {
        throw new Error(`No ${provider} account found for SEED_USER_EMAIL "${email}".`);
    }

    return account.providerAccountId;
}

async function seed() {
    try {
        await dbConnect();
        const userId = await getSeedUserId();
        const board = await initializeUserBoard(userId);
        const columns = await Column.find({ boardId: board._id }).sort({ orderid: 1 });
        const columnByName = new Map(columns.map((column) => [column.name, column]));
        const jobsByColumn = {
            Wishlist: SAMPLE_DATA.slice(0, 3),
            Applied: SAMPLE_DATA.slice(3, 6),
            Interviewing: SAMPLE_DATA.slice(6, 9),
            Offer: SAMPLE_DATA.slice(9, 12),
            Rejected: SAMPLE_DATA.slice(12, 15),
        };
        const missingColumns = Object.keys(jobsByColumn).filter(
            (name) => !columnByName.has(name)
        );

        if (missingColumns.length > 0) {
            throw new Error(`Board is missing required columns: ${missingColumns.join(", ")}`);
        }

        await JobApplications.deleteMany({ userId, boardId: board._id });
        await Column.updateMany(
            { boardId: board._id },
            { $set: { job_applications: [] } }
        );

        for (const [columnName, sampleJobs] of Object.entries(jobsByColumn)) {
            const column = columnByName.get(columnName);
            const applications = await JobApplications.insertMany(
                sampleJobs.map((job, order) => ({
                    ...job,
                    tags: job.tags.split(",").map((tag) => tag.trim()),
                    status: columnName.toLowerCase(),
                    columnId: column._id,
                    boardId: board._id,
                    userId,
                    order,
                }))
            );

            await Column.updateOne(
                { _id: column._id },
                { $set: { job_applications: applications.map(({ _id }) => _id) } }
            );
        }

        await Board.updateOne(
            { _id: board._id },
            { $set: { updatedAt: new Date() } }
        );

        console.log(`Seeded ${SAMPLE_DATA.length} job applications on the "${board.name}" board.`);
    } finally {
        await mongoose.disconnect();
    }
}

seed().catch((error) => {
    console.error("Failed to seed sample job applications:", error);
    process.exitCode = 1;
});