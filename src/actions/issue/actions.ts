"use server";

import prisma from "@/lib/prisma";
import { ActionResponse, Issue } from "@/type";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";


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
}): Promise<ActionResponse<Issue>> {
  try {
    // make sure user is signed in
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Not authenticated" };
    }

    // Make sure the project belongs to the current user
    const project = await prisma.project.findFirst({
      where: { 
        id: projectId,
        user: { clerkId: userId }
      }
    });

    if (!project) {
      return { success: false, error: "Project not found or not authorized" };
    }

    // create new issue for project
    const issue = await prisma.issue.create({
      data: {
        projectId,
        title,
        status,
        priority
      },
    });

    // revalidate
    revalidatePath(`/project/${projectId}`)

    // return data formatted to ui type
    return {
      success: true,
      data: {
	id: issue.id,
	projectId: issue.projectId,
	title: issue.title,
	status: issue.status,
	priority: issue.priority,
	createdAt: issue.createdAt.toISOString(),
	updatedAt: issue.updatedAt.toISOString(),
      } 
    };
  } catch (error) {
    console.error("Create issue error:", error);
    return { success: false, error: "Failed to create issue" };
  }
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
}): Promise<ActionResponse<Issue>> {
  try {
    // make sure user is signed in
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Not authenticated" };
    }

    // make sure the issue exists and belongs to user's project
    const issue = await prisma.issue.findFirst({
      where: { 
        id: issueId,
        project: {
          user: { clerkId: userId }
        }
      }
    });

    if (!issue) {
      return { success: false, error: "Issue not found or not authorized" };
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

    // revalidate
    revalidatePath(`/project/${updatedIssue.projectId}`)

    // return data formatted to ui type
    return {
      success: true,
      data: {
	id: issue.id,
	projectId: issue.projectId,
	title: issue.title,
	status: issue.status,
	priority: issue.priority,
	createdAt: issue.createdAt.toISOString(),
	updatedAt: issue.updatedAt.toISOString(),
      } 
    };
  } catch (error) {
    console.error("Update issue error:", error);
    return { success: false, error: "Failed to update issue" };
  }
}


// delete an issue

export async function deleteIssue(issueId: number): Promise<ActionResponse<Issue>> {
  try {
    // make sure user is signed in
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Not authenticated" };
    }

    // make sure the issue exists and belongs to user's project
    const issue = await prisma.issue.findFirst({
      where: { 
        id: issueId,
        project: {
          user: { clerkId: userId }
        }
      }
    });

    if (!issue) {
      return { success: false, error: "Issue not found or not authorized" };
    }

    // delete the issue
    await prisma.issue.delete({ 
      where: { id: issueId } 
    });

    // revalidate
    revalidatePath(`/project/${issue.projectId}`)

    // return data formatted to ui type
    return {
      success: true,
      data: {
	id: issue.id,
	projectId: issue.projectId,
	title: issue.title,
	status: issue.status,
	priority: issue.priority,
	createdAt: issue.createdAt.toISOString(),
	updatedAt: issue.updatedAt.toISOString(),
      } 
    };
  } catch (error) {
    console.error("Delete issue error:", error);
    return { success: false, error: "Failed to delete issue" };
  }
}
