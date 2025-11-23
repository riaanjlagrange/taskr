"use server";

import prisma from "@/src/lib/prisma";
import { auth } from "@clerk/nextjs/server";


// create a new issue

export async function createIssue({
  projectId,
  title,
  status,
  priority 
}: {
  projectId: number,
  title: string,
  status?: string,
  priority?: string
}) {
  // make sure user is signed in
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated")

  // Make sure the project belongs to the current user
  const project = await prisma.project.findUnique({
    where: { id: projectId },
  });

  if (!project || project.userId !== userId) {
    throw new Error("Project not found or not authorized");
  }

  // create new issue for project
  const issue = await prisma.issue.create({
    data: {
      projectId,
      title,
      status,
      priority
    },
  })

  return issue;
}


// update an issue

export async function updateIssue({
  issueId,
  title,
  status,
  priority
}: {
  issueId: number,
  title?: string,
  status?: string,
  priority?: string
}) {
  // make sure user is signed in
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated")

  // make sure the issue already exists
  const issue = await prisma.issue.findUnique({
    where: { id: issueId }
  })
  if (!issue) {
    throw new Error("Issue not found");
  }

  // make sure the project belongs to the current user
  const project = await prisma.project.findUnique({
    where: { id: issue.projectId },
  });
  if (!project || project.userId !== userId) {
    throw new Error("Project not found or not authorized");
  }
  
  // update the issue
  const updatedIssue = await prisma.issue.update({
    where: { id: issueId },
    data: {
      ...(title && { title }),
      ...(status && { status }),
      ...(priority && { priority }),
    },
  });

  return updatedIssue;
}


// delete an issue

export async function deleteIssue(issueId: number) {
  // make sure user is signed in
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated")

  // make sure the issue already exists
  const issue = await prisma.issue.findUnique({
    where: { id: issueId }
  })
  if (!issue) {
    throw new Error("Issue not found");
  }

  // make sure the project belongs to the current user
  const project = await prisma.project.findUnique({
    where: { id: issue.projectId },
  });
  if (!project || project.userId !== userId) {
    throw new Error("Project not found or not authorized");
  }

  await prisma.issue.delete({ where: { id: issueId } });

  return { success: true };
}
