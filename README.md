# drizzle-bun

A simple db setup using Drizzle and Bun's built-in SQLite API.

## Setup

The only prerequisite for setting up this repo is having [Bun](https://bun.sh/) installed on your computer.

1. Run `bun install` to install dependencies
2. Run `bun run push` to generate the SQLite database

## Usage

Initially, there will be no data in the database. You can generate data by running `bun run generate`, and view your generated data with `bun run read`

## Additional Notes

If you make any changes to the schema (located in `./src/schema/ts`) be sure to run `bun run migrate` to apply your changes to your db.
