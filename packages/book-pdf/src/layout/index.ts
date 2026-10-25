import { asyncCompose } from '../vendor/fns/index.js';

import resolveSvg from './steps/resolveSvg';
import resolveYoga from './steps/resolveYoga';
import resolveZIndex from './steps/resolveZIndex';
import resolveAssets from './steps/resolveAssets';
import resolveStyles from './steps/resolveStyles';
import resolveOrigins from './steps/resolveOrigins';
import resolveBookmarks from './steps/resolveBookmarks';
import resolvePageSizes from './steps/resolvePageSizes';
import resolvePagination, { resolvePaginationResponsive } from './steps/resolvePagination';
import type { RenderTask } from '../render-task';
import resolveDimensions from './steps/resolveDimensions';
import resolveTextLayout from './steps/resolveTextLayout';
import resolveInheritance from './steps/resolveInheritance';
import resolvePagePaddings from './steps/resolvePagePaddings';
import resolvePercentRadius from './steps/resolvePercentRadius';
import resolvePercentHeight from './steps/resolvePercentHeight';
import resolveLinkSubstitution from './steps/resolveLinkSubstitution';

const layout = asyncCompose(
  resolveZIndex,
  resolveOrigins,
  resolveAssets,
  resolvePagination,
  resolveTextLayout,
  resolvePercentRadius,
  resolveDimensions,
  resolveSvg,
  resolveAssets,
  resolveInheritance,
  resolvePercentHeight,
  resolvePagePaddings,
  resolveStyles,
  resolveLinkSubstitution,
  resolveBookmarks,
  resolvePageSizes,
  resolveYoga,
);

export * from './types';

/** Opt-in for the 6x9 proof flow. Other PDF formats retain the original pipeline. */
export async function layoutResponsive(root: any, fontStore: any, task: RenderTask) {
  await task.checkpoint({ stage: 'layout', completed: 0, total: root.children.length }, true);
  root = await resolveYoga(root);
  root = resolvePageSizes(root);
  root = resolveBookmarks(root);
  const children = [];
  const steps = [resolveLinkSubstitution, resolveStyles, resolvePagePaddings,
    resolvePercentHeight, resolveInheritance, resolveAssets, resolveSvg,
    resolveDimensions, resolvePercentRadius, resolveTextLayout];
  for (let i = 0; i < root.children.length; i++) {
    let section: any = { ...root, children: [root.children[i]] };
    for (const step of steps) {
      section = await (step as any)(section, fontStore);
      await task.checkpoint();
    }
    children.push(...section.children);
    await task.checkpoint({ stage: 'layout', completed: i + 1, total: root.children.length });
  }
  root = await resolvePaginationResponsive({ ...root, children }, fontStore, task);
  for (let i = 0; i < root.children.length; i++) {
    let page: any = { ...root, children: [root.children[i]] };
    page = await resolveAssets(page, fontStore);
    page = resolveOrigins(page);
    page = resolveZIndex(page);
    root.children[i] = page.children[0];
    await task.checkpoint();
  }
  return root;
}

export default layout;
