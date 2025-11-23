"use server";

import prisma from "@/src/lib/prisma";
import { auth } from "@clerk/nextjs/server";


// create a new project

export async function createProject({
  title,
  description 
}: {
  title: string,
  description?: string
}) {
  // make sure user is signed in
  const { userId } = await auth();
  if (!userId) throw new Error("Not signed in.")

  // get / create user if not already exist
  const user = await prisma.user.upsert({
    where: { clerkId: userId },
    update: {},
    create: { clerkId: userId }
  })

  // create new project for user
  const project = await prisma.project.create({
    data: {
      title: title,
      description: description || "",
      userId: user.id, // use ID stored in db, not from clerk
    },
  })

  return project;
}


// get projects from user signed in user

export async function getProjects() {
  // make sure user is signed in
  const { userId } = await auth();
  if (!userId) throw new Error("Not signed in.")

  // get projects from that user
  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: { projects: true }
  })

  return user.projects || [];
}


// get single project by id (issues included)

export async function getProjectById(projectId: number) {
  // make sure user is signed in
  const { userId } = await auth();
  if (!userId) throw new Error("Not signed in.")

  // return project
  return prisma.project.findFirst({
    where: {
      id: projectId,
      user: { clerkId: userId }
    },
    include: {
      issues: true
    }
  })
}


// update project by id

export async function updateProject({
  projectId,
  title,
  description
}: {
  projectId: number,
  title: string,
  description: string
}) {
  // make sure user is signed in
  const { userId } = await auth();
  if (!userId) throw new Error("Not signed in.")

  // Make sure the project belongs to the current user
  const project = await prisma.project.findUnique({
    where: { id: projectId },
  });

  if (!project || project.userId !== userId) {
    throw new Error("Project not found or not authorized");
  }

  // update project for user
  const updatedProject = await prisma.project.update({
    data: {
      title: title,
      description: description,
    },
    where: { 
      id: projectId
    }
  })

  return updatedProject;
}


// delete project by id

export async function deleteProjectById(projectId: number) {
  // make sure user is signed in
  const { userId } = await auth();
  if (!userId) throw new Error("Not signed in.")

  // delete project
  return prisma.project.delete({
    where: { id: projectId }
  })
}
