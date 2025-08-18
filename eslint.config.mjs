// @ts-check
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat();

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  ...compat.extends('next/core-web-vitals'),
  ...compat.extends('next/typescript'),
];